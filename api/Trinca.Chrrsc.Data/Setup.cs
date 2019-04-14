using Microsoft.Extensions.DependencyInjection;
using System;
using Trinca.Chrrsc.Data.Context;

namespace Trinca.Chrrsc.Data
{
    public static class Setup
    {
        public static IServiceCollection ConfigureData(this IServiceCollection services)
        {
            services.AddEntityFrameworkNpgsql()
                .AddDbContext<ChrrscContext>()
                .BuildServiceProvider();

            return services;
        }
    }
}
