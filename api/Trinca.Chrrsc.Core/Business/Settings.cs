using System.Linq;
using System.Collections.Generic;
using Trinca.Chrrsc.Contract;
using Trinca.Chrrsc.Contract.Business;
using Trinca.Chrrsc.Data.Context;

namespace Trinca.Chrrsc.Core.Business
{
    public class SettingsBusiness : ISettingsBusiness
    {
        private readonly ChrrscContext context;

        public SettingsBusiness(ChrrscContext context)
        {
            this.context = context;
        }

        public BusinessResult<List<KeyValuePair<string, object>>> Get()
        {
            return new BusinessResult<List<KeyValuePair<string, object>>>
            {
                Data = context.Settings.ToList().Select(x => new KeyValuePair<string, object>(x.Key, x.Value)).ToList(),
                Ok = true
            };
        }
    }
}
