using Trinca.Chrrsc.Contract;
using Trinca.Chrrsc.Contract.Business;
using Trinca.Chrrsc.Contract.Model;
using Trinca.Chrrsc.Contract.Model.Interface;
using Trinca.Chrrsc.Data.Context;
using Trinca.Chrrsc.Data.Entity;

namespace Trinca.Chrrsc.Core.Business
{
    public class PartyBusiness : IPartyBusiness
    {
        private readonly ChrrscContext context;

        public PartyBusiness(ChrrscContext context)
        {
            this.context = context;
        }

        public BusinessResult Save(PartyModel model)
        {

            Barbecue barbecueEntity = new Barbecue
            {
                Why = model.Barbecue.Why,
                When = model.Barbecue.When,
                Description = model.Barbecue.Description
            };

            context.Add(barbecueEntity);

            foreach (IContribution contribution in model.Contributions)
            {
                context.Add(new Party
                {
                    BarbecueId = barbecueEntity.Id,
                    FriendId = contribution.FriendId,
                    Fun = contribution.Fun,
                    Paid = contribution.Paid,
                    Value = contribution.Value,
                    Description = contribution.Description
                });
            }

            context.SaveChanges();

            return new BusinessResult
            {
                Ok = true,
            };
        }
    }
}
