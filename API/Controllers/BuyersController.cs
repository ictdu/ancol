﻿using Application.Buyer;
using Application.Payments.Paypal;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BuyersController: BaseController
    {
        [Authorize]
        [HttpPost("buy")]
        public async Task<PaypalOrderDto> Buy([FromBody]Buy.Query query)
        {
            return await Mediator.Send(query);
        }


        [Authorize]
        [HttpPost("capture")]
        public async Task<Unit> Capture([FromBody] CaptureBuy.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}
