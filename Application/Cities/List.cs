using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cities
{
    public class List
    {
        public class Query : IRequest<List<City>> { }

        public class Handler : IRequestHandler<Query, List<City>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<City>> Handle(Query request, CancellationToken cancellationToken)
            {
                var cities = await _context.Cities.ToListAsync();

                return cities;
            }
        }
    }
}