using System;

namespace Trinca.Chrrsc.Contract.Model.Interface
{
    public interface IBarbecue
    {
        int Id { get; set; }

        string Why { get; set; }

        DateTime When { get; set; }

        string Description { get; set; }
    }
}
