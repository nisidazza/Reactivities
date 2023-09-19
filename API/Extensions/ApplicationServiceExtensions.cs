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
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
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
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary")); // need to match the name in the appsettings.json
            services.AddSignalR();

            return services;
        }
    }
}