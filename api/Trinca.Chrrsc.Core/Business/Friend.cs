using System.Linq;
using System.Collections.Generic;
using Trinca.Chrrsc.Contract;
using Trinca.Chrrsc.Contract.Business;
using Trinca.Chrrsc.Contract.Model;
using Trinca.Chrrsc.Data.Context;
using Trinca.Chrrsc.Data.Entity;

namespace Trinca.Chrrsc.Core.Business
{
    public class FriendBusiness : BusinessBase, IFriendBusiness
    {
        public FriendBusiness(ChrrscContext context) : base(context) { }

        public IEnumerable<FriendModel> Get()
        {
            return Context.Friend.Select(x => new FriendModel
            {
                Id = x.Id,
                Name = x.Name
            }).AsEnumerable();
        }

        public BusinessResult Save(FriendModel model)
        {
            Friend entity = new Friend
            {
                Name = model.Name
            };

            Context.Friend.Add(entity);

            Context.SaveChanges();

            return new BusinessResult<int>
            {
                Ok = true,
                Data = entity.Id
            };
        }
    }
}
