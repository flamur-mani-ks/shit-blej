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
  public class IsAdminRequirement : IAuthorizationRequirement
  {
  }

  public class IsAdminRequirementHandler : AuthorizationHandler<IsAdminRequirement>
  {
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly DataContext _context;
    public IsAdminRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
    {
      _context = context;
      _httpContextAccessor = httpContextAccessor;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAdminRequirement requirement)
    {
      if (context.Resource is AuthorizationFilterContext authContext)
      {
        var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = _context.Users.SingleOrDefault(x => x.UserName == currentUserName);

        

        if (user.Role == "admin")
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