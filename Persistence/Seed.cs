using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
  public class Seed
  {
    public static void SeedData(DataContext context)
    {
      if (!context.Products.Any())
      {
        var products = new List<Product>
                {
                    new Product
                    {
                        Title = "Shes Laptop Hp",
                        Description = "Laptopi eshte ne gjendje perfekte",
                        Category = "Teknologji",
                        Price = 99.99,
                        City = "Ferizaj",
                        Date = DateTime.Now.AddDays(-1)
                    },
                    new Product
                    {
                        Title = "Shes Banesen ne qender te Ferizajt",
                        Description = "Banesa eshte ne gjendje perfekte",
                        Category = "Patundshmeri",
                        Price = 65000,
                        City = "Ferizaj",
                        Date = DateTime.Now.AddDays(-2)
                    },
                    new Product
                    {
                        Title = "Leshoj Banesen me qera per student afer UP",
                        Description = "Banesa eshte ne gjendje perfekte",
                        Category = "Patundshmeri",
                        Price = 150,
                        City = "Prishtine",
                        Date = DateTime.Now.AddDays(-1)
                    },
                    new Product
                    {
                        Title = "Shes Iphone X MAX shume pak i perdorun",
                        Description = "Telefoni eshte ne gjendje perfekte",
                        Category = "Teknologji",
                        Price = 350,
                        City = "Gjilan",
                        Date = DateTime.Now
                    },
                };

        context.Products.AddRange(products);
        context.SaveChanges();
      }
    }
  }
}