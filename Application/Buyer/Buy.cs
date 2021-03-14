using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.EntityFrameworkCore;
using Application.Payments.Paypal;
using AutoMapper;

namespace Application.Buyer
{
    public class Buy
    {
        public class Query : IRequest<PaypalOrderDto>
        {
            public Guid ProductId { get; set; }
            public int Qty { get; set; }
        }

        public class Handler : IRequestHandler<Query, PaypalOrderDto>
        {
            private readonly DataContext _ctx;
            private readonly IMapper _mapper;
            private readonly IPaypalAccessor _paypalAccessor;

            public Handler(DataContext ctx, IMapper mapper, IPaypalAccessor paypalAccessor)
            {
                _ctx = ctx;
                _mapper = mapper;
                this._paypalAccessor = paypalAccessor;
            }

            public async Task<PaypalOrderDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = await  _ctx.Products.FindAsync(request.ProductId);

                var result = _paypalAccessor.CreateOrder(product.Price * request.Qty);

                return result;
            }
        }

    }
}
