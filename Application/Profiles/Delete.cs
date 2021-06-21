using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Profiles
{
  public class Delete
  {
    public class Command : IRequest
    {
      public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      private readonly UserManager<AppUser> _userManager;
      public Handler(UserManager<AppUser> userManager, DataContext context)
      {
        _context = context;
        _userManager = userManager;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var user = await _userManager.FindByNameAsync(request.Username);

        if (user == null)
          throw new RestException(HttpStatusCode.NotFound, new { user = "Not found" });

        var products = user.UserProducts.Where(x => x.IsOwner).ToList();
        var jobs = user.UserJobs.Where(x => x.IsOwner).ToList();
        var blogs = user.UserBlogs.Where(x => x.IsAuthor).ToList();
        var photos = user.Photos.ToList();
         

        if (products != null)
        {
          for (int i = 0; i < products.Count; i++)
          {
            var product = _context.Products.Find(products[i].ProductId);
            _context.Remove(product);
          }
        }

        if (jobs != null)
        {
          for (int i = 0; i < jobs.Count; i++)
          {
            var job = _context.Jobs.Find(jobs[i].JobId);
            _context.Remove(job);
          }
        }

        if (blogs != null)
        {
          for (int i = 0; i < blogs.Count; i++)
          {
            var blog = _context.Blogs.Find(blogs[i].BlogId);
            _context.Remove(blog);
          }
        }

        if (photos != null)
        {
          for (int i = 0; i < photos.Count; i++)
          {
            var photo = _context.Photos.Find(photos[i].Id);
            _context.Remove(photo);
          }
        }

        _context.Remove(user);

        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}