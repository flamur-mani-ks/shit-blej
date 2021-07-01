using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.TeamMemberPositions
{
  public class List
  {
    public class Query : IRequest<List<TeamMemberPosition>> { }

    public class Handler : IRequestHandler<Query, List<TeamMemberPosition>>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<List<TeamMemberPosition>> Handle(Query request, CancellationToken cancellationToken)
      {
        var teamMemberPositions = await _context.TeamMemberPositions.ToListAsync();

        return teamMemberPositions;
      }
    }
  }
}