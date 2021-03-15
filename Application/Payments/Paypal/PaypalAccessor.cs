using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Payments.Paypal
{
    public class PaypalAccessor : IPaypalAccessor
    {
        private readonly PaypalSettings _paypalSettings;
        private readonly PayPalHttpClient _paypalClient;

        private readonly string _requestHost;

        public PaypalAccessor(IOptions<PaypalSettings> paypalSettings, IHttpContextAccessor httpContextAccessor)
        {
            _requestHost = "http://" + httpContextAccessor.HttpContext.Request.Host.Value + "/paypal/";

            _paypalSettings = new PaypalSettings
            {
                ClientId = paypalSettings.Value.ClientId,
                Secret = paypalSettings.Value.Secret,
                ReturnUrl = paypalSettings.Value.ReturnUrl
            };

            PayPalEnvironment environment = new SandboxEnvironment(_paypalSettings.ClientId, _paypalSettings.Secret);
            _paypalClient = new PayPalHttpClient(environment);
        }

        public PaypalCaptureOrderDto CaptureOrder(string orderId)
        {
            var request = new OrdersCaptureRequest(orderId);
            request.RequestBody(new OrderActionRequest());
            var response = _paypalClient.Execute(request).Result;
            var statusCode = response.StatusCode;
            Order result = response.Result<Order>();

            return new PaypalCaptureOrderDto
            {
                CaptureId = result.Id,
                Status = result.Status,
            };
        }

        public PaypalOrderDto CreateOrder(decimal amount)
        {
            var order = new OrderRequest()
            {
                CheckoutPaymentIntent = "CAPTURE",
                PurchaseUnits = new List<PurchaseUnitRequest>
                {
                    new PurchaseUnitRequest
                    {
                        AmountWithBreakdown = new AmountWithBreakdown
                        {
                            CurrencyCode = "PHP",
                            Value = amount.ToString()
                        }
                    }
                },
                ApplicationContext = new ApplicationContext()
                {
                    ReturnUrl = _paypalSettings.ReturnUrl,
                    CancelUrl = _requestHost + "cancel",
                }
            };

            var request = new OrdersCreateRequest();
            request.Prefer("return=representation");
            request.RequestBody(order);
            var response = _paypalClient.Execute(request).Result;
            var statusCode = response.StatusCode;
            Order result = response.Result<Order>();

            return new PaypalOrderDto
            {
                CheckoutLink = result.Links[1].Href,
                OrderId = result.Id,
            };
        }
    }
}
