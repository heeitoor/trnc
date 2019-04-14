using Microsoft.AspNetCore.Mvc;
using Trinca.Chrrsc.Contract;
using Trinca.Chrrsc.Contract.Business;
using Trinca.Chrrsc.Contract.Model;
using Trinca.Chrrsc.Data.Context;

namespace Trinca.Chrrsc.WebAPI.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PartyController : ControllerBase
    {
        readonly IPartyBusiness partyBusiness;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="partyBusiness"></param>
        public PartyController(IPartyBusiness partyBusiness)
        {
            this.partyBusiness = partyBusiness;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<BusinessResult> Post([FromBody]PartyModel model)
        {
            return partyBusiness.Save(model);
        }
    }
}