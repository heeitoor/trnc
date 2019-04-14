using System.Collections.Generic;

namespace Trinca.Chrrsc.Contract.Business
{
    public interface ISettingsBusiness
    {
        BusinessResult<List<KeyValuePair<string, object>>> Get();
    }
}
