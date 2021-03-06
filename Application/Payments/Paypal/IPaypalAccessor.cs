﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Payments.Paypal
{
    public interface IPaypalAccessor
    {
        PaypalOrderDto CreateOrder(decimal amount);
        PaypalCaptureOrderDto CaptureOrder(string orderId);
    }
}
