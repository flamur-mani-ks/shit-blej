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
    public class ListBlogs
    {
        public class Query : IRequest<List<UserBlogDto>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserBlogDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserBlogDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                
                var blogs = user.UserBlogs.Where(x => x.IsAuthor).ToList();
                var blogsToReturn = new List<UserBlogDto>();

                foreach (var blog in blogs)
                {
                    var userBlog = new UserBlogDto
                    {
                        Id = blog.Blog.Id,
                        Title = blog.Blog.Title,
                        Category = blog.Blog.Category,
                        Date = blog.Blog.Date
                    };

                    blogsToReturn.Add(userBlog);
                }

                return blogsToReturn;
            }
        }
    }
}