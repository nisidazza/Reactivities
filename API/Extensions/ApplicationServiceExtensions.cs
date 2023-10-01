using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using Infrastructure.Photos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Infrastructure.Email;

namespace API.Extensions
{
    // we use static because we don't need to create a new instance of this class when we use the extensions method
    public static class ApplicationServiceExtensions
    {
        // "this" refers to where we re using this extensions method on 
        // "config" gives access to appsettings.json, appsettings.Development.json
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                string connStr;
                // Depending on if in development or production, use either FlyIO
                // connection string, or development connection string from env var.
                if (env == "Development")
                {
                    // Use connection string from file.
                    connStr = config.GetConnectionString("DefaultConnection");
                }
                else
                {
                    // Use connection string provided at runtime by FlyIO.
                    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                    // Parse connection URL to connection string for Npgsql
                    connUrl = connUrl.Replace("postgres://", string.Empty);
                    var pgUserPass = connUrl.Split("@")[0];
                    var pgHostPortDb = connUrl.Split("@")[1];
                    var pgHostPort = pgHostPortDb.Split("/")[0];
                    var pgDb = pgHostPortDb.Split("/")[1];
                    var pgUser = pgUserPass.Split(":")[0];
                    var pgPass = pgUserPass.Split(":")[1];
                    var pgHost = pgHostPort.Split(":")[0];
                    var pgPort = pgHostPort.Split(":")[1];
                    var updatedHost = pgHost.Replace("flycast", "internal");

                    connStr = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
                }
                // Whether the connection string came from the local development configuration file
                // or from the environment variable from FlyIO, use it to set up your DbContext.
                opt.UseNpgsql(connStr);
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    // policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                    policy.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials();
                });
            });
            services.AddMediatR(typeof(List.Handler));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            services.AddHttpContextAccessor(); // so we can use it inside the Infrastructure project
            services.AddScoped<IUserAccessor, UserAccessor>(); // thanks to this we can inject it inside the Application handlers
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddScoped<EmailSender>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary")); // need to match the name in the appsettings.json
            services.AddSignalR();

            return services;
        }
    }
}