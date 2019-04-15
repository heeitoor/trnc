using Trinca.Chrrsc.Contract;
using Trinca.Chrrsc.Contract.Business;
using Trinca.Chrrsc.Contract.Model;
using Trinca.Chrrsc.Contract.Model.Interface;
using Trinca.Chrrsc.Data.Context;
using Trinca.Chrrsc.Data.Entity;

namespace Trinca.Chrrsc.Core.Business
{
    public class PartyBusiness : BusinessBase, IPartyBusiness
    {
        public PartyBusiness(ChrrscContext context) : base(context) { }

        public BusinessResult Save(PartyModel model)
        {

            Barbecue barbecueEntity = new Barbecue
            {
                Why = model.Barbecue.Why,
                When = model.Barbecue.When,
                Description = model.Barbecue.Description
            };

            Context.Add(barbecueEntity);

            foreach (IContribution contribution in model.Contributions)
            {
                Context.Add(new Party
                {
                    BarbecueId = barbecueEntity.Id,
                    FriendId = contribution.FriendId,
                    Fun = contribution.Fun,
                    Paid = contribution.Paid,
                    Value = contribution.Value,
                    Description = contribution.Description
                });
            }

            Context.SaveChanges();

            return new BusinessResult
            {
                Ok = true,
            };
        }
    }
}
