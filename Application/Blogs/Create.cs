using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blogs
{
  public class Create
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public string Title { get; set; }
      public string Body { get; set; }
      public string Category { get; set; }
      public DateTime Date { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Body).NotEmpty();
        RuleFor(x => x.Category).NotEmpty();
        RuleFor(x => x.Date).NotEmpty();
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
        var blog = new Blog
        {
          Id = request.Id,
          Title = request.Title,
          Body = request.Body,
          Category = request.Category,
          Date = request.Date
        };

        _context.Blogs.Add(blog);

        var user = await _context.Users.SingleOrDefaultAsync(x =>
              x.UserName == _userAccessor.GetCurrentUsername());

        var attendee = new UserBlog
        {
          AppUser = user,
          Blog = blog,
          IsAuthor = true,
        };

        _context.UserBlogs.Add(attendee);

        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}