using Application.User;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class UsersController : BaseController
    {

        [HttpPost]
        public async Task<UserDto> Login()
        {
            return await Mediator.Send(new Login.Query());
        }
    }
}
