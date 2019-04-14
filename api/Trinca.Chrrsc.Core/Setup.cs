using Microsoft.Extensions.DependencyInjection;
using Trinca.Chrrsc.Contract.Business;
using Trinca.Chrrsc.Core.Business;

namespace Trinca.Chrrsc.Core
{
    public static class Setup
    {
        public static IServiceCollection ConfigureBusiness(this IServiceCollection services)
        {
            services.AddTransient<IBarbecueBusiness, BarbecueBusiness>();
            services.AddTransient<IFriendBusiness, FriendBusiness>();
            services.AddTransient<IPartyBusiness, PartyBusiness>();
            services.AddTransient<ISettingsBusiness, SettingsBusiness>();

            return services;
        }
    }
}
