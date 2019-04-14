using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Trinca.Chrrsc.WebAPI.Model
{
    public class BarbecueGridItem
    {
        public int Id { get; set; }

        public string Why { get; set; }

        public DateTime When { get; set; }

        public decimal Amount { get; set; }

        public int FriendsCount { get; set; }
    }
}
