using System.Text;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<DataContext>(); // allows us to query the users in the Entity Framework Store or database

            // for now it has to match the key we use to sign-in (in the TokenService) so the API can decrypt it!!!
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true, // check if it's a valid token
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            services.AddAuthorization(opt => opt.AddPolicy("IsActivityHost", policy =>
            {
                policy.Requirements.Add(new IsHostRequirement());
            }));
            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
            // this token service is going to be scoped to the Http request itself:
            // 1. Http request
            // 2. Account Controller: the user is logging in and so it's requesting a token
            // 3. A new instancce of the token service is created
            // 4. When the http request is finished, we will dispose of the token service
            services.AddScoped<TokenService>();

            return services;
        }
    }
}