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
  }
}