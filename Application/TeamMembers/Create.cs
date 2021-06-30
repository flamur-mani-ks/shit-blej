using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.TeamMembers
{
  public class Create
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
        var teamMember = new TeamMember
        {
          Id = request.Id,
          FullName = request.FullName,
          Position = request.Position,
          Bio = request.Bio,
          Facebook = request.Facebook,
          Twitter = request.Twitter,
          Github = request.Github,
          LinkedIn = request.LinkedIn
        };

        _context.TeamMembers.Add(teamMember);
        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}