using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Cities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class CitiesController : BaseController
  {

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<City>>> List()
    {
      return await Mediator.Send(new List.Query());
    }

    [Authorize(Policy = "IsAdmin")]
    [HttpPost]
    public async Task<ActionResult<Unit>> Create(Create.Command command)
    {
      return await Mediator.Send(command);
    }

    [Authorize(Policy = "IsAdmin")]
    [HttpPut("{id}")]
    public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
    {
      command.Id = id;
      return await Mediator.Send(command);
    }

    [Authorize(Policy = "IsAdmin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult<Unit>> Delete(Guid id)
    {
      return await Mediator.Send(new Delete.Command { Id = id });
    }
  }
}