namespace Application.Payments.Paypal
{
    public class PaypalOrderDto
    {
        public string CheckoutLink { get; set; }
        public string OrderId { get; set; }
    }
}