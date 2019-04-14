using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Trinca.Chrrsc.Core.Business;
using Trinca.Chrrsc.Data.Context;
using Trinca.Chrrsc.WebAPI.Model;

namespace Trinca.Chrrsc.WebAPI.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class FriendController : ControllerBase
    {
        readonly ChrrscContext context;
        readonly BarbecueBusiness business;

        public FriendController(ChrrscContext c)
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
            return new JsonResult(context.Friend.Select(x => new FriendListItem
            {
                Id = x.Id,
                Name = x.Name
            }));
        }
    }
}
// Incluir um novo churrasco com data, descrição e observações adicionais;
// Adicionar e remover participantes (colocando o seu valor de contribuição);
// Colocar um valor sugerido por usuário de contribuição (valor com e sem bebida inclusa);
// Visualizar os detalhes do churrasco, total de participantes e valor arrecadado.
// Para ajudá-lo, elaboramos um protótipo que você pode utilizar (ou não) para projetar sua solução:http://tinyurl.com/zn8ncg3.