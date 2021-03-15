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
using Application.User;

namespace Application.Buyer
{
    public class Buy
    {
        public class Query : IRequest<PaypalOrderDto>
        {
            public Guid ProductId { get; set; }
            public int Qty { get; set; }
            public string ShippingAddress { get; set; }
        }

        public class Handler : IRequestHandler<Query, PaypalOrderDto>
        {
            private readonly DataContext _ctx;
            private readonly IMapper _mapper;
            private readonly IPaypalAccessor _paypalAccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext ctx, IMapper mapper, IPaypalAccessor paypalAccessor, IUserAccessor userAccessor)
            {
                _ctx = ctx;
                _mapper = mapper;
                this._paypalAccessor = paypalAccessor;
                this._userAccessor = userAccessor;
            }

            public async Task<PaypalOrderDto> Handle(Query request, CancellationToken cancellationToken)
            {
                //var buyer = await _ctx.Buyers.FindAsync(_userAccessor.GetCurrentUserId());

                var product = await  _ctx.Products.FindAsync(request.ProductId);

                var result = _paypalAccessor.CreateOrder(product.Price * request.Qty);

                var soldProduct = new Domain.SoldProduct
                {
                    BuyerId = _userAccessor.GetCurrentUserId(),
                    Id = result.OrderId,
                    CreatedAt = DateTime.Now,
                    IsCaptured = false,
                    Price = product.Price,
                    ProductId = product.Id,
                    Qty = request.Qty,                    
                    ShippingAddress = request.ShippingAddress
                };

                _ctx.SoldProducts.Add(soldProduct);

                await _ctx.SaveChangesAsync();

                return result;
            }
        }

    }
}
