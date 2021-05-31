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
    public static async Task SeedData(DataContext context,
        UserManager<AppUser> userManager)
    {
      if (!userManager.Users.Any())
      {
        var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com",
                        City = "Ferizaj",
                        PhoneNumber = "+383-44-111-222"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com",
                        City = "Prishtine",
                        PhoneNumber = "+383-49-123-456"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com",
                        City = "Gjilan",
                        PhoneNumber = "+383-43-987-654"
                    },
                };

        foreach (var user in users)
        {
          await userManager.CreateAsync(user, "Pa$$w0rd");
        }
      }

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
                        Date = DateTime.Now.AddDays(-1),
                        UserProducts = new List<UserProduct>
                        {
                            new UserProduct
                            {
                                AppUserId = "a",
                                IsOwner = true,

                            }
                        }
                    },
                    new Product
                    {
                        Title = "Shes Banesen ne qender te Ferizajt",
                        Description = "Banesa eshte ne gjendje perfekte",
                        Category = "Patundshmeri",
                        Price = 65000,
                        City = "Ferizaj",
                        Date = DateTime.Now.AddDays(-2),
                        UserProducts = new List<UserProduct>
                        {
                            new UserProduct
                            {
                                AppUserId = "b",
                                IsOwner = true,
                            },
                        }
                    },
                    new Product
                    {
                        Title = "Shes Iphone X MAX shume pak i perdorun",
                        Description = "Telefoni eshte ne gjendje perfekte",
                        Category = "Teknologji",
                        Price = 350,
                        City = "Gjilan",
                        Date = DateTime.Now,
                        UserProducts = new List<UserProduct>
                        {
                            new UserProduct
                            {
                                AppUserId = "b",
                                IsOwner = true,
                            },

                        }
                    },


                };

        await context.Products.AddRangeAsync(products);
        await context.SaveChangesAsync();
      }
    }
  }
}