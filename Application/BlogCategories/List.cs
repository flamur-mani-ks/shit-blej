using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BlogCategories
{
    public class List
    {
        public class Query : IRequest<List<BlogCategory>> { }

        public class Handler : IRequestHandler<Query, List<BlogCategory>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<BlogCategory>> Handle(Query request, CancellationToken cancellationToken)
            {
                var blogCategories = await _context.BlogCategories.ToListAsync();

                return blogCategories;
            }
        }
    }
}