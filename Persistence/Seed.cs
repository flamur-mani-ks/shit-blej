using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
  public class Seed
  {
    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
    {
      if (!userManager.Users.Any())
      {
        var users = new List<AppUser>
            {
                new AppUser
                {
                    DisplayName = "Bob",
                    UserName = "bob",
                    Email = "bob@test.com",
                    PhoneNumber = "+383-49-123-456",
                    City = "Ferizaj"
                },
                new AppUser
                {
                    DisplayName = "Tom",
                    UserName = "tom",
                    Email = "tom@test.com",
                      PhoneNumber = "+383-44-456-789",
                    City = "Gjilan"
                },
                new AppUser
                {
                    DisplayName = "Jane",
                    UserName = "jane",
                    Email = "jane@test.com",
                    PhoneNumber = "+383-43-111-222",
                    City = "Prishtine"
                }
            };

            foreach (var user in users)
            {
              await userManager.CreateAsync(user, "Pa$$w0rd");
            }
      };


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