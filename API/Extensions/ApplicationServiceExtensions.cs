using Application.Core;
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
                    policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
                });
            });
            services.AddMediatR(typeof(Application.Activities.List.Handler));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}