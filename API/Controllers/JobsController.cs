using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Jobs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class JobsController : BaseController
  {
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<JobDto>>> List()
    {
      return await Mediator.Send(new List.Query());
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<JobDto>> Details(Guid id)
    {
      return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<Unit>> Create(Create.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "IsJobOwner")]
    public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
    {
      command.Id = id;
      return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "IsJobOwner")]
    public async Task<ActionResult<Unit>> Delete(Guid id)
    {
      return await Mediator.Send(new Delete.Command { Id = id });
    }
  }
}