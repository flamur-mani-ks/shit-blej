using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Jobs
{
  public class Edit
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public string Title { get; set; }
      public string Description { get; set; }
      public string Category { get; set; }
      public string City { get; set; }
      public string WorkingHours { get; set; }
      public DateTime? CreatedAt { get; set; }
      public DateTime? ExpiresAt { get; set; }
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
      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var job = await _context.Jobs.FindAsync(request.Id);

        if (job == null)
          throw new RestException(HttpStatusCode.NotFound, new { job = "Not found" });

        job.Title = request.Title ?? job.Title;
        job.Description = request.Description ?? job.Description;
        job.Category = request.Category ?? job.Category;
        job.WorkingHours = request.WorkingHours ?? job.WorkingHours;
        job.City = request.City ?? job.City;
        job.CreatedAt = request.CreatedAt ?? job.CreatedAt;
        job.ExpiresAt = request.ExpiresAt ?? job.ExpiresAt;

        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}