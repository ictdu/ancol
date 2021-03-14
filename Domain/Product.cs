using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public int Stocks { get; set; }

        public string Description { get; set; }

        public string ImagePath { get; set; }

        public decimal Price { get; set; }

        public Seller Seller { get; set; }

        public string SellerId { get; set; }

        public DateTime CreatedAt { get; set; }

        public ICollection<SoldProduct> Buyers { get; set; }
    }
}
