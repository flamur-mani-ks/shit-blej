using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
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
      public DateTime? Date { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Category).NotEmpty();
        RuleFor(x => x.Price).NotEmpty();
        RuleFor(x => x.City).NotEmpty();
      }
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
          throw new RestException(HttpStatusCode.NotFound, new {product = "Not found"});

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