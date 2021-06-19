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

        _context.Remove(user);

        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}