﻿using Application.User;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Product
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Stocks { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        public string SellerName { get; set; }
        public string SellerId { get; set; }

        public DateTime CreatedAt { get; set; }
        public string ImagePath { get; set; }
    }
}
