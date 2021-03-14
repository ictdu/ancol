namespace Application.Payments.Paypal
{
    public class PaypalCaptureOrderDto
    {
        public string CaptureId { get; set; }
        public string Status { get; set; }
    }
}