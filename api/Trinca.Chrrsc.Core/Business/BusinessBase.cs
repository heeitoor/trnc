using Trinca.Chrrsc.Data.Context;

namespace Trinca.Chrrsc.Core.Business
{
    public abstract class BusinessBase
    {
        public ChrrscContext Context { get; private set; }

        public BusinessBase(ChrrscContext context)
        {
            this.Context = context;
        }
    }
}
