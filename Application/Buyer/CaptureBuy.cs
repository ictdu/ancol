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

namespace Application.Buyer
{
    public class CaptureBuy
    {

        public class Command : IRequest
        {
            public string OrderId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IPaypalAccessor _paypalAccessor;

            public Handler(DataContext context, IPaypalAccessor paypalAccessor)
            {
                _context = context;
                this._paypalAccessor = paypalAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var soldProduct = await _context.SoldProducts.FindAsync(request.OrderId);

                _paypalAccessor.CaptureOrder(request.OrderId);

                soldProduct.IsCaptured = true;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }

    }
}
