using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Trinca.Chrrsc.Contract.Business;
using Trinca.Chrrsc.Contract.Model;

namespace Trinca.Chrrsc.WebAPI.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class BarbecueController : ControllerBase
    {
        readonly IBarbecueBusiness barbecueBusiness;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="barbecueBusiness"></param>
        public BarbecueController(IBarbecueBusiness barbecueBusiness)
        {
            this.barbecueBusiness = barbecueBusiness;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<IEnumerable<BarbecueGridItem>> Get()
        {
            return new JsonResult(barbecueBusiness.Get());
        }
    }
}
