using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Contacts
{
  public class Create
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public string FullName { get; set; }
      public string Email { get; set; }
      public string Message { get; set; }
      public string PhoneNumber { get; set; }
      public string City { get; set; }
      public DateTime Date { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.FullName).NotEmpty();
        RuleFor(x => x.Email).NotEmpty();
        RuleFor(x => x.Message).NotEmpty();
      }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _context = context;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var contact = new Contact
        {
          Id = request.Id,
          FullName = request.FullName,
          Email = request.Email,
          Message = request.Message,
          PhoneNumber = request.PhoneNumber,
          City = request.City,
          Date = request.Date
        };

        _context.Contacts.Add(contact);

        _context.Contacts.Add(contact);

        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}