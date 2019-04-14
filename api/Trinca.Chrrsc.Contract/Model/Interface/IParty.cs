using System.Collections.Generic;

namespace Trinca.Chrrsc.Contract.Model.Interface
{
    public interface IContribution : IFriend
    {
        int BarbecueId { get; set; }

        int FriendId { get; set; }

        decimal Value { get; set; }

        string Description { get; set; }

        bool Fun { get; set; }

        bool Paid { get; set; }
    }

    public interface IParty { }

    public interface IParty<T1, T2> : IParty
        where T1 : IBarbecue
        where T2 : IContribution
    {
        T1 Barbecue { get; set; }

        List<T2> Contributions { get; set; }
    }
}
