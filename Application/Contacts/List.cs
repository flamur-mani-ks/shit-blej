using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contacts
{
  public class List
  {
    public class Query : IRequest<List<ContactDto>> { }

    public class Handler : IRequestHandler<Query, List<ContactDto>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<List<ContactDto>> Handle(Query request, CancellationToken cancellationToken)
      {
        var contacts = await _context.Contacts
            .ToListAsync();

        return _mapper.Map<List<Contact>, List<ContactDto>>(contacts);
      }
    }
  }
}