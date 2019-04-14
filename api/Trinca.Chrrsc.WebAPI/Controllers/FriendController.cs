using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Trinca.Chrrsc.Contract;
using Trinca.Chrrsc.Contract.Business;
using Trinca.Chrrsc.Contract.Model;

namespace Trinca.Chrrsc.WebAPI.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class FriendController : ControllerBase
    {
        readonly IFriendBusiness friendBusiness;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="friendBusiness"></param>
        public FriendController(IFriendBusiness friendBusiness)
        {
            this.friendBusiness = friendBusiness;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<IEnumerable<BarbecueGridItem>> Get()
        {
            return new JsonResult(friendBusiness.Get());
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<BusinessResult> Post([FromBody]FriendModel model)
        {
            return friendBusiness.Save(model);
        }
    }
}