

using API.Services;
using Domain;
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
            })
            .AddEntityFrameworkStores<DataContext>(); // allows us to query the users in the Entity Framework Store or database

            services.AddAuthentication();
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