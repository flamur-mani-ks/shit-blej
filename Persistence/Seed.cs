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
                        DisplayName = "Admin",
                        UserName = "admin",
                        Email = "admin@test.com",
                        City = "Ferizaj",
                        PhoneNumber = "+383-44-000-111",
                        Role = "admin"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Besfort",
                        UserName = "besfort",
                        Email = "besfort@test.com",
                        City = "Prishtine",
                        PhoneNumber = "+383-49-123-456"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Fisnik",
                        UserName = "fisnik",
                        Email = "fisnik@test.com",
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
                                AppUserId = "b",
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
                                AppUserId = "c",
                                IsOwner = true,
                            },

                        }
                    },


                };

        await context.Products.AddRangeAsync(products);
        await context.SaveChangesAsync();
      }


      if (!context.Jobs.Any())
      {
        var jobs = new List<Job>
                {
                    new Job
                    {
                        Title = "Asistentë/e të shitjes",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Shitje",
                        City = "Ferizaj",
                        WorkingHours = "Full Time",
                        CreatedAt = DateTime.Now,
                        ExpiresAt = DateTime.Now.AddDays(15),
                        UserJobs = new List<UserJob>
                        {
                            new UserJob
                            {
                                AppUserId = "c",
                                IsOwner = true,
                            }
                        }
                    },
                    new Job
                    {
                        Title = "Pizzaman",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Gastronomi",
                        City = "Prishtine",
                        WorkingHours = "Full Time",
                        CreatedAt = DateTime.Now,
                        ExpiresAt = DateTime.Now.AddDays(20),
                        UserJobs = new List<UserJob>
                        {
                            new UserJob
                            {
                                AppUserId = "b",
                                IsOwner = true,
                            }
                        }
                    },
                   new Job
                    {
                        Title = "Call Center Agent",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Telekomunikim",
                        City = "Gjilan",
                        WorkingHours = "Part Time",
                        CreatedAt = DateTime.Now,
                        ExpiresAt = DateTime.Now.AddDays(30),
                        UserJobs = new List<UserJob>
                        {
                            new UserJob
                            {
                                AppUserId = "c",
                                IsOwner = true,
                            }
                        }
                    },


                };

        await context.Jobs.AddRangeAsync(jobs);
        await context.SaveChangesAsync();
      }

       if (!context.Blogs.Any())
      {
        var blogs = new List<Blog>
                {
                    new Blog
                    {
                        Title = "Simpotmat e COVID-19 që duhet ti dini",
                        Body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Shëndetësi",
                        Date = DateTime.Now.AddDays(1),
                        UserBlogs = new List<UserBlog>
                        {
                            new UserBlog
                            {
                                AppUserId = "c",
                                IsAuthor = true,
                            }
                        }
                    },
                    new Blog
                    {
                        Title = "Si ta gjejm balancin mes karrierës dhe shoqërisë",
                        Body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Jeta",
                        Date = DateTime.Now.AddDays(20),
                        UserBlogs = new List<UserBlog>
                        {
                            new UserBlog
                            {
                                AppUserId = "b",
                                IsAuthor = true,
                            }
                        }
                    },
                   new Blog
                    {
                        Title = "Zhvillimi i I.O.T dhe ndikimi që ka në jetën tonë të përditshme",
                        Body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Teknologji",
                        Date = DateTime.Now.AddDays(3),
                        UserBlogs = new List<UserBlog>
                        {
                            new UserBlog
                            {
                                AppUserId = "c",
                                IsAuthor = true,
                            }
                        }
                    },


                };

        await context.Blogs.AddRangeAsync(blogs);
        await context.SaveChangesAsync();
      }
    }
  }
}