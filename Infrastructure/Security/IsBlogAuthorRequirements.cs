using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;

namespace Infrastructure.Security
{
  public class IsBlogAuthorRequirement : IAuthorizationRequirement
  {
  }

  public class IsBlogAuthorRequirementHandler : AuthorizationHandler<IsBlogAuthorRequirement>
  {
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly DataContext _context;
    public IsBlogAuthorRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
    {
      _context = context;
      _httpContextAccessor = httpContextAccessor;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsBlogAuthorRequirement requirement)
    {
      if (context.Resource is AuthorizationFilterContext authContext)
      {
        var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = _context.Users.SingleOrDefault(x => x.UserName == currentUserName);

        var blogId = Guid.Parse(authContext.RouteData.Values["id"].ToString());

        var blog = _context.Blogs.FindAsync(blogId).Result;

        var author = blog.UserBlogs.FirstOrDefault(x => x.IsAuthor);

        if (author?.AppUser?.UserName == currentUserName || user.Role == "admin")
          context.Succeed(requirement);
      }
      else
      {
        context.Fail();
      }

      return Task.CompletedTask;
    }
  }
}