using System.Linq;
using System.Collections.Generic;
using Trinca.Chrrsc.Contract;
using Trinca.Chrrsc.Contract.Business;
using Trinca.Chrrsc.Data.Context;

namespace Trinca.Chrrsc.Core.Business
{
    public class SettingsBusiness : BusinessBase, ISettingsBusiness
    {
        public SettingsBusiness(ChrrscContext context) : base(context) { }

        public BusinessResult<List<KeyValuePair<string, object>>> Get()
        {
            return new BusinessResult<List<KeyValuePair<string, object>>>
            {
                Data = Context.Settings.ToList().Select(x => new KeyValuePair<string, object>(x.Key, x.Value)).ToList(),
                Ok = true
            };
        }
    }
}
