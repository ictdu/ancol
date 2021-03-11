using Application.Product;
using MediatR;
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

        [HttpPost]
        [Authorize]
        public async Task<Unit> Create([FromBody] Add.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<Unit> Edit([FromRoute] Guid id, [FromBody] Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
    }
}
