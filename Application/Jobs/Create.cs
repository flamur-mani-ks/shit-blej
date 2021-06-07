using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
  public class Create
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public string Title { get; set; }
      public string Description { get; set; }
      public string Category { get; set; }
      public string City { get; set; }
      public string WorkingHours { get; set; }
      public DateTime CreatedAt { get; set; }
      public DateTime ExpiresAt { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Category).NotEmpty();
        RuleFor(x => x.WorkingHours).NotEmpty();
        RuleFor(x => x.City).NotEmpty();
        RuleFor(x => x.ExpiresAt).NotEmpty();
      }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var job = new Job
        {
          Id = request.Id,
          Title = request.Title,
          Description = request.Description,
          Category = request.Category,
          WorkingHours = request.WorkingHours,
          City = request.City,
          CreatedAt = request.CreatedAt,
          ExpiresAt = request.ExpiresAt
        };

        _context.Jobs.Add(job);

        var user = await _context.Users.SingleOrDefaultAsync(x =>
              x.UserName == _userAccessor.GetCurrentUsername());

        var attendee = new UserJob
        {
          AppUser = user,
          Job = job,
          IsOwner = true,
        };

        _context.UserJobs.Add(attendee);

        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}