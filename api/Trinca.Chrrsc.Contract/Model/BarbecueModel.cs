using System;
using Trinca.Chrrsc.Contract.Model.Interface;

namespace Trinca.Chrrsc.Contract.Model
{
    public class BarbecueModel : IBarbecue
    {
        public int Id { get; set; }

        public string Why { get; set; }

        public DateTime When { get; set; }

        public string Description { get; set; }
    }

    public class BarbecueGridItem : BarbecueModel
    {
        public decimal Amount { get; set; }

        public int FriendsCount { get; set; }
    }
}
