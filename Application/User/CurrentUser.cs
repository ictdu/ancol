using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Domain;

namespace Application.User
{
    public class CurrentUser
    {

        public class Query : IRequest<object> { }

        public class Handler : IRequestHandler<Query, object>
        {
            private readonly DataContext _ctx;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext ctx, IMapper mapper, UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _ctx = ctx;
                _mapper = mapper;
                this._userManager = userManager;
                this._userAccessor = userAccessor;
            }

            public async Task<object> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUserId = _userAccessor.GetCurrentUserId();

                if (await _ctx.Sellers.AnyAsync(x => x.AppUserId == currentUserId))
                {
                    var seller = _mapper.Map<SellerDto>(await _ctx.Sellers.Include(x => x.AppUser)
                        .SingleAsync(x => x.AppUserId == currentUserId));
                    return new UserDto
                    {
                        User = seller,
                        Type = "seller"
                    };
                }
                else if (await _ctx.Buyers.AnyAsync(x => x.AppUserId == currentUserId))
                {
                    var buyer = _mapper.Map<BuyerDto>(await _ctx.Buyers.Include(x => x.AppUser)
                        .SingleAsync(x => x.AppUserId == currentUserId));
                    return new UserDto
                    {
                        User = buyer,
                        Type = "buyer"
                    };
                }


                throw new RestException(System.Net.HttpStatusCode.InternalServerError,
                    new { Login = "Something went wrong." });
            }
        }

    }
}
