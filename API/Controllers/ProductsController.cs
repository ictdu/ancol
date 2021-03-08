using Application.Product;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ProductsController : BaseController
    {
        [HttpGet]
        [Authorize]
        public async Task<List<ProductDto>> List()
        {
            return await Mediator.Send(new Application.Product.List.Query());
        }

    }
}
