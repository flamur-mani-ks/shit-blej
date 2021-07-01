using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.TeamMemberPositions
{
  public class Edit
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
        var teamMemberPosition = await _context.TeamMemberPositions.FindAsync(request.Id);

        if (teamMemberPosition == null)
          throw new Exception("Could not find teamMemberPosition");

        teamMemberPosition.Position = request.Position ?? teamMemberPosition.Position;

        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}