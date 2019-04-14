using Microsoft.Extensions.DependencyInjection;
using Trinca.Chrrsc.Contract;
using Trinca.Chrrsc.Core.Business;

namespace Trinca.Chrrsc.Core
{
    public static class Setup
    {
        public static IServiceCollection ConfigureBusiness(this IServiceCollection services)
        {
            services.AddTransient<IBusiness, BarbecueBusiness>();

            return services;
        }
    }
}
