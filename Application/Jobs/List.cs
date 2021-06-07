using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
    public class List
    {
        public class Query : IRequest<List<JobDto>> { }

        public class Handler : IRequestHandler<Query, List<JobDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<JobDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobs = await _context.Jobs
                    .ToListAsync();

                return _mapper.Map<List<Job>, List<JobDto>>(jobs);
            }
        }
    }
}