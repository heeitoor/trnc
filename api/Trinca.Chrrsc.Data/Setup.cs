using Microsoft.Extensions.DependencyInjection;
using Trinca.Chrrsc.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Trinca.Chrrsc.Data
{
    public static class Setup
    {
        public static IServiceCollection ConfigureData(this IServiceCollection services, string connectionString)
        {
            services.AddEntityFrameworkNpgsql()
                .AddDbContext<ChrrscContext>(x => x.UseNpgsql(connectionString))
                .BuildServiceProvider();

            return services;
        }
    }
}
