using Trinca.Chrrsc.Contract.Model.Interface;

namespace Trinca.Chrrsc.Contract.Model
{
    public class ContributionModel : IContribution
    {
        public int BarbecueId { get; set; }

        public int FriendId { get; set; }

        public decimal Value { get; set; }

        public string Description { get; set; }

        public bool Fun { get; set; }

        public bool Paid { get; set; }

        public int Id { get; set; }

        public string Name { get; set; }
    }
}
