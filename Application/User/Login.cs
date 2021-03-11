using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Domain;
using AutoMapper;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<object>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class Handler : IRequestHandler<Query, object>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly DataContext _ctx;
            private readonly IMapper _mapper;
            private readonly SignInManager<AppUser> _signInManager;

            public Handler(UserManager<AppUser> userManager, DataContext ctx, IMapper mapper, SignInManager<AppUser> signInManager)
            {
                this._userManager = userManager;
                this._ctx = ctx;
                this._mapper = mapper;
                this._signInManager = signInManager;
            }

            public async Task<object> Handle(Query request, CancellationToken cancellationToken)
            {
                var userInDb = await _userManager.FindByEmailAsync(request.Email);
                if (userInDb == null)
                    throw new RestException(System.Net.HttpStatusCode.Unauthorized,
                        new { Login = "Invalid email or password" });

                var result = await _signInManager.CheckPasswordSignInAsync(userInDb, request.Password, false);

                if(!result.Succeeded)
                    throw new RestException(System.Net.HttpStatusCode.Unauthorized,
                        new { Login = "Invalid email or password" });

                if (await _ctx.Sellers.AnyAsync(x => x.AppUserId == userInDb.Id))
                {
                    var seller = _mapper.Map<SellerDto>(await _ctx.Sellers.SingleAsync(x => x.AppUserId == userInDb.Id));
                    return new UserDto
                    {
                        User = seller, Type = "seller"
                    };
                }
                else if (await _ctx.Buyers.AnyAsync(x => x.AppUserId == userInDb.Id))
                {
                    var buyer = _mapper.Map<BuyerDto>(await _ctx.Buyers.SingleAsync(x => x.AppUserId == userInDb.Id));
                    return new UserDto
                    {
                        User = buyer,
                        Type = "buyer"
                    };
                }
                else
                {
                    throw new RestException(System.Net.HttpStatusCode.InternalServerError,
                        new { Login = "Something went wrong." });
                }

            }
        }
    }

}
