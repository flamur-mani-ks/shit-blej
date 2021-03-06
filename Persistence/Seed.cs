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
                        Role = "admin"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Flamur",
                        UserName = "flamur",
                        Email = "flamur@test.com",
                        City = "Ferizaj",
                        PhoneNumber = "+383-44-000-111",
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Besfort",
                        UserName = "besfort",
                        Email = "besfort@test.com",
                        City = "Prishtinë",
                        PhoneNumber = "+383-49-123-456"
                    },
                    new AppUser
                    {
                        Id = "d",
                        DisplayName = "Fisnik",
                        UserName = "fisnik",
                        Email = "fisnik@test.com",
                        City = "Gjilan",
                        PhoneNumber = "+383-43-987-654"
                    },
                     new AppUser
                    {
                        Id = "e",
                        DisplayName = "Eron",
                        UserName = "eron",
                        Email = "eron@test.com",
                        City = "Lipjan",
                        PhoneNumber = "+383-43-555-666"
                    },
                    new AppUser
                    {
                        Id = "f",
                        DisplayName = "Gentrit",
                        UserName = "gentrit",
                        Email = "gentrit@test.com",
                        City = "Viti",
                        PhoneNumber = "+383-43-555-666"
                    },
                     new AppUser
                    {
                        Id = "g",
                        DisplayName = "Ermal",
                        UserName = "ermal",
                        Email = "ermal@test.com",
                        City = "Prizren",
                        PhoneNumber = "+383-43-222-333"
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
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Kompjuterë",
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
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Banesa",
                        Price = 65000,
                        City = "Ferizaj",
                        Date = DateTime.Now.AddDays(-2),
                        UserProducts = new List<UserProduct>
                        {
                            new UserProduct
                            {
                                AppUserId = "c",
                                IsOwner = true,
                            },
                        }
                    },
                    new Product
                    {
                        Title = "Shes Iphone X MAX shume pak i perdorun",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Telefona",
                        Price = 350,
                        City = "Gjilan",
                        Date = DateTime.Now,
                        UserProducts = new List<UserProduct>
                        {
                            new UserProduct
                            {
                                AppUserId = "d",
                                IsOwner = true,
                            },

                        }
                    },

                    new Product
                    {
                        Title = "Shes shtepine ne lagjen Ulpiana",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Shtëpi",
                        Price = 85000,
                        City = "Prishtinë",
                        Date = DateTime.Now,
                        UserProducts = new List<UserProduct>
                        {
                            new UserProduct
                            {
                                AppUserId = "e",
                                IsOwner = true,
                            },

                        }
                    },
                        new Product
                    {
                        Title = "Shes skuterin 150cc i importuar nga Zvicrra",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Motoçikleta (mbi 50cc)",
                        Price = 350,
                        City = "Prishtinë",
                        Date = DateTime.Now,
                        UserProducts = new List<UserProduct>
                        {
                            new UserProduct
                            {
                                AppUserId = "g",
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
                                AppUserId = "f",
                                IsOwner = true,
                            }
                        }
                    },
                    new Job
                    {
                        Title = "Pizzaman",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Gastronomi",
                        City = "Prishtinë",
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
                    new Job
                    {
                        Title = "Shitës në Pompë",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Shitje",
                        City = "Vushtrri",
                        WorkingHours = "Full Time",
                        CreatedAt = DateTime.Now,
                        ExpiresAt = DateTime.Now.AddDays(15),
                        UserJobs = new List<UserJob>
                        {
                            new UserJob
                            {
                                AppUserId = "g",
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
                                AppUserId = "d",
                                IsAuthor = true,
                            }
                        }
                    },
                    new Blog
                    {
                        Title = "Pesë (5) rregulla që iu garantojnë sukses",
                        Body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Jeta",
                        Date = DateTime.Now.AddDays(20),
                        UserBlogs = new List<UserBlog>
                        {
                            new UserBlog
                            {
                                AppUserId = "e",
                                IsAuthor = true,
                            }
                        }
                    },
                   new Blog
                    {
                        Title = "Zhvillimi i I.O.T dhe ndikimi që ka në botë",
                        Body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec bibendum dolor. Nam fringilla sagittis sodales. Sed turpis ante, sagittis a leo ut, elementum gravida ex. Aenean at ullamcorper ipsum, vulputate interdum risus. Nunc in mi tempus, vestibulum lorem id, sagittis dolor. Nullam ultricies molestie volutpat. Mauris mollis felis et.",
                        Category = "Teknologji",
                        Date = DateTime.Now.AddDays(3),
                        UserBlogs = new List<UserBlog>
                        {
                            new UserBlog
                            {
                                AppUserId = "f",
                                IsAuthor = true,
                            }
                        }
                    },
                

                };

        await context.Blogs.AddRangeAsync(blogs);
        await context.SaveChangesAsync();
      }

      if (!context.Cities.Any())
      {
        var cities = new List<City>
                {
                    new City
                    {
                        CityName = "Artanë"
                    },
                    new City
                    {
                        CityName = "Besianë"
                    },
                    new City
                    {
                        CityName = "Burim"
                    },
                    new City
                    {
                        CityName = "Dardanë"
                    },
                    new City
                    {
                        CityName = "Deçan"
                    },
                    new City
                    {
                        CityName = "Dragash"
                    },
                    new City
                    {
                        CityName = "Drenas"
                    },
                    new City
                    {
                        CityName = "Ferizaj"
                    },
                    new City
                    {
                        CityName = "Fushë Kosovë"
                    },
                    new City
                    {
                        CityName = "Gjakovë"
                    },
                    new City
                    {
                        CityName = "Gjilan"
                    },
                    new City
                    {
                        CityName = "Kastriot"
                    },
                    new City
                    {
                        CityName = "Kaçanik"
                    },
                    new City
                    {
                        CityName = "Klinë"
                    },
                    new City
                    {
                        CityName = "Leposaviq"
                    },
                    new City
                    {
                        CityName = "Lipjan"
                    },
                    new City
                    {
                        CityName = "Malishevë"
                    },
                    new City
                    {
                        CityName = "Mitrovicë"
                    },
                    new City
                    {
                        CityName = "Pejë"
                    },
                    new City
                    {
                        CityName = "Prishtinë"
                    },
                    new City
                    {
                        CityName = "Prizren"
                    },
                    new City
                    {
                        CityName = "Rahovec"
                    },
                    new City
                    {
                        CityName = "Skenderaj"
                    },
                    new City
                    {
                        CityName = "Shtërpcë"
                    },
                    new City
                    {
                        CityName = "Shtime"
                    },
                    new City
                    {
                        CityName = "Therandë"
                    },
                    new City
                    {
                        CityName = "Viti"
                    },
                    new City
                    {
                        CityName = "Vushtrri"
                    },
                    new City
                    {
                        CityName = "Zubin Potok"
                    },
                    new City
                    {
                        CityName = "Zveçan"
                    },

                };

        await context.Cities.AddRangeAsync(cities);
        await context.SaveChangesAsync();
      }

      if (!context.ProductCategories.Any())
      {
        var productCategories = new List<ProductCategory>
                {
                    new ProductCategory
                    {
                        Category = "Vetura",
                    },
                     new ProductCategory
                    {
                        Category = "Autopjesë dhe Pajisje",
                    },
                    new ProductCategory
                    {
                        Category = "Motoçikleta (mbi 50cc)",
                    },
                    new ProductCategory
                    {
                        Category = "Moped (nën 50cc)",
                    },

                    new ProductCategory
                    {
                        Category = "Shtëpi",
                    },
                    new ProductCategory
                    {
                        Category = "Banesa",
                    },
                    new ProductCategory
                    {
                        Category = "Telefona",
                    },
                    new ProductCategory
                    {
                        Category = "Kompjuterë",
                    },
                };

            await context.ProductCategories.AddRangeAsync(productCategories);
            await context.SaveChangesAsync();
        }

      if (!context.TeamMembers.Any())
      {
        var teamMembers = new List<TeamMember>
                {
                    new TeamMember
                    {
                        FullName = "Gentrit Arifi",
                        Position = "Front-End Developer",
                        Bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu magna et leo viverra vestibulum sit amet ac velit.",
                        Facebook = "https://www.facebook.com/",
                        Twitter = "https://twitter.com/",
                        Github = "https://github.com/",
                        LinkedIn = "https://www.linkedin.com/"
                    },
                     new TeamMember
                    {
                        FullName = "Ermal Bajrami",
                        Position = "UI/UX Designer",
                        Bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu magna et leo viverra vestibulum sit amet ac velit.",
                        Facebook = "https://www.facebook.com/",
                        Twitter = "https://twitter.com/",
                        Github = "https://github.com/",
                        LinkedIn = "https://www.linkedin.com/"
                    },
                     new TeamMember
                    {
                        FullName = "Eron Guta",
                        Position = "SEO Specialist",
                        Bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu magna et leo viverra vestibulum sit amet ac velit.",
                        Facebook = "https://www.facebook.com/",
                        Twitter = "https://twitter.com/",
                        Github = "https://github.com/",
                        LinkedIn = "https://www.linkedin.com/"
                    },
                     new TeamMember
                    {
                        FullName = "Fisnik Hetemi",
                        Position = "Full-Stack Developer",
                        Bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu magna et leo viverra vestibulum sit amet ac velit.",
                        Facebook = "https://www.facebook.com/",
                        Twitter = "https://twitter.com/",
                        Github = "https://github.com/",
                        LinkedIn = "https://www.linkedin.com/"
                    },
                     new TeamMember
                    {
                        FullName = "Besfort Sherifi",
                        Position = "Dev-Ops Engineer",
                        Bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu magna et leo viverra vestibulum sit amet ac velit.",
                        Facebook = "https://www.facebook.com/",
                        Twitter = "https://twitter.com/",
                        Github = "https://github.com/",
                        LinkedIn = "https://www.linkedin.com/"
                    },
                    new TeamMember
                    {
                        FullName = "Flamur Mani",
                        Position = "Back-End Developer",
                        Bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu magna et leo viverra vestibulum sit amet ac velit.",
                        Facebook = "https://www.facebook.com/",
                        Twitter = "https://twitter.com/",
                        Github = "https://github.com/",
                        LinkedIn = "https://www.linkedin.com/"
                    },
                };

        await context.TeamMembers.AddRangeAsync(teamMembers);
        await context.SaveChangesAsync();
      }

      if (!context.TeamMemberPositions.Any())
      {
        var teamMemberPositions = new List<TeamMemberPosition>
                {
                    new TeamMemberPosition
                    {
                        Position = "Front-End Developer"
                    },
                     new TeamMemberPosition
                    {
                        Position = "UI/UX Designer"
                    },
                    new TeamMemberPosition
                    {
                        Position = "SEO Specialist"
                    },
                    new TeamMemberPosition
                    {
                        Position = "Full-Stack Developer"
                    },
                    new TeamMemberPosition
                    {
                        Position = "Dev-Ops Engineer"
                    },
                    new TeamMemberPosition
                    {
                        Position = "Back-End Developer"
                    },
                };

        await context.TeamMemberPositions.AddRangeAsync(teamMemberPositions);
        await context.SaveChangesAsync();
      }

      if (!context.BlogCategories.Any())
      {
        var blogCategories = new List<BlogCategory>
                {
                    new BlogCategory
                    {
                        Category = "Shëndetësi"
                    },
                     new BlogCategory
                    {
                        Category = "Jeta"
                    },
                    new BlogCategory
                    {
                        Category = "Teknologji"
                    },
                    new BlogCategory
                    {
                        Category = "Sport"
                    },
                    new BlogCategory
                    {
                        Category = "Politikë"
                    },
                    new BlogCategory
                    {
                        Category = "Ekonomi"
                    },
                    new BlogCategory
                    {
                        Category = "Fitness"
                    },
                    new BlogCategory
                    {
                        Category = "Udhëtime"
                    },
                    new BlogCategory
                    {
                        Category = "Kuzhinë"
                    },
                    new BlogCategory
                    {
                        Category = "Biznes"
                    },
                };

        await context.BlogCategories.AddRangeAsync(blogCategories);
        await context.SaveChangesAsync();
      }

      if (!context.JobCategories.Any())
      {
        var jobCategories = new List<JobCategory>
                {
                    new JobCategory
                    {
                        Category = "Shitje"
                    },
                     new JobCategory
                    {
                        Category = "Gastronomi"
                    },
                    new JobCategory
                    {
                        Category = "Telekomunikim"
                    },
                    new JobCategory
                    {
                        Category = "Informatikë"
                    },
                    new JobCategory
                    {
                        Category = "Marketing & PR"
                    },
                    new JobCategory
                    {
                        Category = "Administratë"
                    },
                     new JobCategory
                    {
                        Category = "Mekanikë"
                    },
                     new JobCategory
                    {
                        Category = "Arkitekturë"
                    },
                     new JobCategory
                    {
                        Category = "Hoteleri"
                    },
                     new JobCategory
                    {
                        Category = "Financa"
                    },
                };

        await context.JobCategories.AddRangeAsync(jobCategories);
        await context.SaveChangesAsync();
      }


    }
  }
}