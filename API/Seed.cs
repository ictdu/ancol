using Domain;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API
{
    public class Seed
    {
        private class SeedModel
        {
            [JsonPropertyName("products")]
            public ICollection<Product> Products { get; set; }
        }

        public static void SeedData(DataContext ctx, UserManager<AppUser> userManager)
        {
            var jsonText = System.IO.File.ReadAllText("seed.json");
            var data = JsonSerializer.Deserialize<SeedModel>(jsonText);

            if (ctx.Products.Any()) return;

            ctx.Products.AddRange(data.Products);

            ctx.SaveChanges();
        }
    }
}
