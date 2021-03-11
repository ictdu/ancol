using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.EntityFrameworkCore;
using Application.User;

namespace Application.Product
{
    public class Add
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public decimal Price { get; set; }
            public int Stocks { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                this._userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var sellerId = _userAccessor.GetCurrentUserId();

                var product = new Domain.Product
                {
                    SellerId = sellerId,
                    Id = request.Id,
                    Description = request.Description,
                    Name = request.Name,
                    Price = request.Price,
                    Stocks = request.Stocks,
                    CreatedAt = DateTime.Now
                };

                _context.Products.Add(product);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }

    }
}
