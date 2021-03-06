﻿using Application.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class UsersController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<object> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpGet("current")]
        public async Task<object> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}
