using System;
using System.Collections.Generic;
using System.Text;
using Trinca.Chrrsc.Contract;

namespace Trinca.Chrrsc.Core.Business
{
    public class BarbecueBusiness : IBusiness
    {
        public BarbecueBusiness()
        {
        }

        public BusinessResult Save()
        {
            return new BusinessResult
            {
                Ok = true
            };
        }
    }
}
