using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain
{
    public class SoldProduct
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }

        public Product Product { get; set; }
        public Guid ProductId { get; set; }

        public Buyer Buyer { get; set; }
        public string BuyerId { get; set; }

        public decimal Price { get; set; }
        public int Qty { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
