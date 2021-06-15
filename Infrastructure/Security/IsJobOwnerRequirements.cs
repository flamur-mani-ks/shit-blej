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
  public class IsJobOwnerRequirement : IAuthorizationRequirement
  {
  }

  public class IsJobOwnerRequirementHandler : AuthorizationHandler<IsJobOwnerRequirement>
  {
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly DataContext _context;
    public IsJobOwnerRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
    {
      _context = context;
      _httpContextAccessor = httpContextAccessor;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsJobOwnerRequirement requirement)
    {
      if (context.Resource is AuthorizationFilterContext authContext)
      {
        var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = _context.Users.SingleOrDefault(x => x.UserName == currentUserName);

        var jobId = Guid.Parse(authContext.RouteData.Values["id"].ToString());

        var job = _context.Jobs.FindAsync(jobId).Result;

        var owner = job.UserJobs.FirstOrDefault(x => x.IsOwner);

        if (owner?.AppUser?.UserName == currentUserName || user.Role == "admin")
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