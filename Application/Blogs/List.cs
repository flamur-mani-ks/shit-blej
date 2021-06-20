using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blogs
{
    public class List
    {
        public class Query : IRequest<List<BlogDto>> { }

        public class Handler : IRequestHandler<Query, List<BlogDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<BlogDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var blogs = await _context.Blogs
                    .ToListAsync();

                return _mapper.Map<List<Blog>, List<BlogDto>>(blogs);
            }
        }
    }
}