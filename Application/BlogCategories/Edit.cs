using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.BlogCategories
{
  public class Edit
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public string Category { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.Category).NotEmpty();
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
        var blogCategory = await _context.BlogCategories.FindAsync(request.Id);

        if (blogCategory == null)
          throw new Exception("Could not find blogCategory");

        blogCategory.Category = request.Category ?? blogCategory.Category;

        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}