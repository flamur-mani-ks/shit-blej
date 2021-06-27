using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.BlogCategories
{
  public class Create
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public string Category { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var blogCategory = new BlogCategory
        {
          Id = request.Id,
          Category = request.Category
        };

        _context.BlogCategories.Add(blogCategory);
        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}