using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ProfilesController : BaseController
  {
    [HttpGet]
    [Authorize(Policy = "IsAdmin")]
    public async Task<ActionResult<List<ProfileDto>>> List()
    {
      return await Mediator.Send(new List.Query());
    }

    [AllowAnonymous]
    [HttpGet("{username}")]
    public async Task<ActionResult<Profile>> Get(string username)
    {
      return await Mediator.Send(new Details.Query { Username = username });
    }

    [HttpPut]
    public async Task<ActionResult<Unit>> Edit(Edit.Command command)
    {
      return await Mediator.Send(command);
    }

    [AllowAnonymous]
    [HttpGet("{username}/products")]
    public async Task<ActionResult<List<UserProductDto>>> GetUserProducts(string username)
    {
      return await Mediator.Send(new ListProducts.Query{Username = username});
    }

    [AllowAnonymous]
    [HttpGet("{username}/jobs")]
    public async Task<ActionResult<List<UserJobDto>>> GetUserJobs(string username)
    {
      return await Mediator.Send(new ListJobs.Query{Username = username});
    }

    [HttpDelete("{username}")]
    [Authorize(Policy = "IsAdmin")]
    public async Task<ActionResult<Unit>> Delete(string username)
    {
      return await Mediator.Send(new Delete.Command { Username = username });
    }
  }
}