using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Payments.Paypal
{
    public class PaypalSettings
    {
        public string ClientId { get; set; }
        public string Secret { get; set; }
        public string ReturnUrl { get; set; }
    }
}
