using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
  public class List
  {
    public class Query : IRequest<List<ProfileDto>> { }

    public class Handler : IRequestHandler<Query, List<ProfileDto>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<List<ProfileDto>> Handle(Query request, CancellationToken cancellationToken)
      {
        var profiles = await _context.Users
            .ToListAsync();

        return _mapper.Map<List<AppUser>, List<ProfileDto>>(profiles);
      }
    }
  }
}