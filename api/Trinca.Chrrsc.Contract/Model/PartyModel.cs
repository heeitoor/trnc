using System.Collections.Generic;
using Trinca.Chrrsc.Contract.Model.Interface;

namespace Trinca.Chrrsc.Contract.Model
{
    public class PartyModel : IParty<BarbecueModel, ContributionModel>
    {
        public BarbecueModel Barbecue { get; set; }

        public List<ContributionModel> Contributions { get; set; }
    }
}
