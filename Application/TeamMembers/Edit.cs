using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.TeamMembers
{
  public class Edit
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public string FullName { get; set; }
      public string Position { get; set; }
      public string Bio { get; set; }
      public string Facebook { get; set; }
      public string Twitter { get; set; }
      public string Github { get; set; }
      public string LinkedIn { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.FullName).NotEmpty();
        RuleFor(x => x.Position).NotEmpty();
        RuleFor(x => x.Bio).NotEmpty();
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
        var teamMember = await _context.TeamMembers.FindAsync(request.Id);

        if (teamMember == null)
          throw new Exception("Could not find teamMember");

        teamMember.FullName = request.FullName ?? teamMember.FullName;
        teamMember.Position = request.Position ?? teamMember.Position;
        teamMember.Bio = request.Bio ?? teamMember.Bio;
        teamMember.Facebook = request.Facebook ?? teamMember.Facebook;
        teamMember.Twitter = request.Twitter ?? teamMember.Twitter;
        teamMember.Github = request.Github ?? teamMember.Github;
        teamMember.LinkedIn = request.LinkedIn ?? teamMember.LinkedIn;

        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}