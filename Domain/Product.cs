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

        public Seller Seller { get; set; }

        public Guid SellerId { get; set; }
    }
}
