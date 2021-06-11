using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListJobs
    {
        public class Query : IRequest<List<UserJobDto>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserJobDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserJobDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                
                var jobs = user.UserJobs.Where(x => x.IsOwner).ToList();
                var jobsToReturn = new List<UserJobDto>();

                foreach (var job in jobs)
                {
                    var userJob = new UserJobDto
                    {
                        Id = job.Job.Id,
                        Title = job.Job.Title,
                        Category = job.Job.Category,
                        ExpiresAt = job.Job.ExpiresAt
                    };

                    jobsToReturn.Add(userJob);
                }

                return jobsToReturn;
            }
        }
    }
}