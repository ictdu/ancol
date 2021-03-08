﻿using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

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

            public Handler(DataContext ctx, IMapper mapper)
            {
                _ctx = ctx;
                _mapper = mapper;
            }

            public async Task<List<ProductDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = await _ctx.Products.ToListAsync();

                return _mapper.Map<List<ProductDto>>(product);
            }
        }

    }
}
