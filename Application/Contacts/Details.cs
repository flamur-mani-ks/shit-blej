using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Contacts
{
  public class Details
  {
    public class Query : IRequest<ContactDto>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, ContactDto>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<ContactDto> Handle(Query request, CancellationToken cancellationToken)
      {
        var contact = await _context.Contacts.FindAsync(request.Id);

        if (contact == null)
          throw new RestException(HttpStatusCode.NotFound, new { contact = "Not found" });

        var contactToReturn = _mapper.Map<Contact, ContactDto>(contact);

        return contactToReturn;
      }
    }
  }
}