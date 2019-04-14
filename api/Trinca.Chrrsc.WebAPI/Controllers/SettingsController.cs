using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Trinca.Chrrsc.Contract.Business;

namespace Trinca.Chrrsc.WebAPI.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        readonly ISettingsBusiness settingsBusiness;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="settingsBusiness"></param>
        public SettingsController(ISettingsBusiness settingsBusiness)
        {
            this.settingsBusiness = settingsBusiness;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<List<KeyValuePair<string, object>>> Get()
        {
            return new JsonResult(settingsBusiness.Get());
        }
    }
}