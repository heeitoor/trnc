using System.Collections.Generic;
using Trinca.Chrrsc.Contract.Model;

namespace Trinca.Chrrsc.Contract.Business
{
    public interface IBarbecueBusiness
    {
        IEnumerable<BarbecueModel> Get();
    }
}
