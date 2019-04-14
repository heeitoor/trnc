using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Trinca.Chrrsc.Core.Business;
using Trinca.Chrrsc.Data;
using Trinca.Chrrsc.Data.Context;
using Trinca.Chrrsc.Data.Entity;
using Trinca.Chrrsc.WebAPI.Model;

namespace Trinca.Chrrsc.WebAPI.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class BarbecueController : ControllerBase
    {
        readonly ChrrscContext context;
        readonly BarbecueBusiness business;

        public BarbecueController(ChrrscContext c)
        {
            context = c;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<IEnumerable<BarbecueGridItem>> Get()
        {
            return new JsonResult(context.Barbecue.Select(x => new BarbecueGridItem
            {
                Id = x.Id,
                Why = x.Why,
                When = x.When,
                Amount = x.Parties.Sum(y => y.Value),
                FriendsCount = x.Parties.Count()
            }).AsEnumerable());
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public void Post([FromBody] BarbecueGridItem model)
        {
            context.Add(new Barbecue
            {
                Id = model.Id,
                Why = model.Why,
                When = model.When
            });

            context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] BarbecueGridItem model)
        {
            Barbecue b = new Barbecue
            {
                Id = model.Id,
                Why = model.Why,
                When = model.When
            };

            context.Entry(b).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

            context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            context.Remove(new Barbecue
            {
                Id = id
            });
            context.SaveChanges();
        }
    }
}
