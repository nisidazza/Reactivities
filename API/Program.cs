using API.Extensions;
using API.Middleware;
using API.SignalR;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

// create Kestrel server and read from the config files (appsettings/appsettings.Development.json)
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(opt =>
{
    // evry single controller endpoint is going to require authentication
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline - Middleware
app.UseMiddleware<ExceptionMiddleware>();

app.UseXContentTypeOptions();
// allows a site to control how much info the browser includes when navigating away from the app
app.UseReferrerPolicy(opt => opt.NoReferrer());
// cross sites scripting protection header
app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
// prevents app to be used inside an IFrame
app.UseXfo(opt => opt.Deny());
// main defense against cross-site scripting attacks
app.UseCsp(opt => opt
// force app to load only HTTPs content
.BlockAllMixedContent()
// Self: whatever it's coming from our domain, are approved sources of content
.StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com"))
.FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "data:"))
.FormActions(s => s.Self())
.FrameAncestors(s => s.Self())
.ImageSources(s => s.Self().CustomSources("blob:", "https://res.cloudinary.com"))
.ScriptSources(s => s.Self())
);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // enable strict transport policy header only in Production mode
    // we should use app.UseHsts() middleware but not working properly
    app.Use(async (context, next) =>
    {
        // max age is 1 year in seconds
        context.Response.Headers.Add("strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}

// Order is important here because the request goes through a pipeline

// Middleware to apply the cors header to the response - the name needs to match the one in services
app.UseCors("CorsPolicy");
//must come first authorization!!!
app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles(); // looks inside wwwroot folder and retrieve the index.html that it's going to use and serve from the Kestrel server
app.UseStaticFiles(); // serves the content inside the wwwroot folder

app.MapControllers();

app.MapHub<ChatHub>("/chat"); // route we'e going to direct users to when they connect to our chat hub;
app.MapFallbackToController("Index", "Fallback");

// Creating the database
// we don't have dependency injection here, so in order to use DataContext service we need to use a scope
// "using" : when we are done with this scope, anything inside it, it's going to be destroied and cleaned up from memory 
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync(); // this is equvalent to the " dotnet ef database update" command
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
