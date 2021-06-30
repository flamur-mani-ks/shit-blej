using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.TeamMembers
{
    public class List
    {
        public class Query : IRequest<List<TeamMember>> { }

        public class Handler : IRequestHandler<Query, List<TeamMember>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<TeamMember>> Handle(Query request, CancellationToken cancellationToken)
            {
                var teamMembers = await _context.TeamMembers.ToListAsync();

                return teamMembers;
            }
        }
    }
}