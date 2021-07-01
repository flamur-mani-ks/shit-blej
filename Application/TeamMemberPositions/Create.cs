using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.TeamMemberPositions
{
  public class Create
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public string Position { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.Position).NotEmpty();
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
        var teamMemberPosition = new TeamMemberPosition
        {
          Id = request.Id,
          Position = request.Position
        };

        _context.TeamMemberPositions.Add(teamMemberPosition);
        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}