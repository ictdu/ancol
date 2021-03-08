using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Application.User;
using System.Linq;

namespace Application.Product
{
    public class List
    {

        public class Query : IRequest<List<ProductDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<ProductDto>>
        {
            private readonly DataContext _ctx;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext ctx, IMapper mapper, IUserAccessor userAccessor)
            {
                _ctx = ctx;
                _mapper = mapper;
                this._userAccessor = userAccessor;
            }

            public async Task<List<ProductDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = await _ctx.Products.Where(x => x.SellerId == _userAccessor.GetCurrentUserId())
                    .ToListAsync();

                return _mapper.Map<List<ProductDto>>(product);
            }
        }

    }
}
