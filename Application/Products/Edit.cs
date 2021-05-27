using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Products
{
  public class Edit
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public string Title { get; set; }
      public string Description { get; set; }
      public string Category { get; set; }
      public double? Price { get; set; }
      public string City { get; set; }
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
        var product = await _context.Products.FindAsync(request.Id);

        if (product == null)
          throw new Exception("Could not find product");

        product.Title = request.Title ?? product.Title;
        product.Description = request.Description ?? product.Description;
        product.Category = request.Category ?? product.Category;
        product.Price = request.Price ?? product.Price;
        product.City = request.City ?? product.City;

        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}