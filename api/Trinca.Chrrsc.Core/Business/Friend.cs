using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Trinca.Chrrsc.Contract;
using Trinca.Chrrsc.Contract.Business;
using Trinca.Chrrsc.Contract.Model;
using Trinca.Chrrsc.Data.Context;
using Trinca.Chrrsc.Data.Entity;

namespace Trinca.Chrrsc.Core.Business
{
    public class FriendBusiness : IFriendBusiness
    {
        private readonly ChrrscContext context;

        public FriendBusiness(ChrrscContext context)
        {
            this.context = context;
        }

        public IEnumerable<FriendModel> Get()
        {
            return context.Friend.Select(x => new FriendModel
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

            context.Friend.Add(entity);

            context.SaveChanges();

            return new BusinessResult<int>
            {
                Ok = true,
                Data = entity.Id
            };
        }
    }
}
