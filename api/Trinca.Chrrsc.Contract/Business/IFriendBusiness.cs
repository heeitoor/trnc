using System.Collections.Generic;
using Trinca.Chrrsc.Contract.Model;

namespace Trinca.Chrrsc.Contract.Business
{
    public interface IFriendBusiness
    {
        BusinessResult Save(FriendModel model);

        IEnumerable<FriendModel> Get();
    }
}
