namespace Trinca.Chrrsc.Contract
{
    public abstract class ResultBase
    {
        public bool Ok { get; set; }
    }

    public class BusinessResult : ResultBase
    {
    }

    public class BusinessResult<T> : BusinessResult
    {
        public T Data { get; set; }
    }
}
