using System.Collections.Generic;
using System.Linq;
using Trinca.Chrrsc.Contract.Business;
using Trinca.Chrrsc.Contract.Model;
using Trinca.Chrrsc.Data.Context;

namespace Trinca.Chrrsc.Core.Business
{
    public class BarbecueBusiness : BusinessBase, IBarbecueBusiness
    {
        public BarbecueBusiness(ChrrscContext context) : base(context) { }

        public IEnumerable<BarbecueModel> Get()
        {
            return Context.Barbecue.Select(x => new BarbecueGridItem
            {
                Id = x.Id,
                Why = x.Why,
                When = x.When,
                Amount = x.Parties.Sum(y => y.Value),
                FriendsCount = x.Parties.Count()
            }).AsEnumerable();
        }
    }
}
