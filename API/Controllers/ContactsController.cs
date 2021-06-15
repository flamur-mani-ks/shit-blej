using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Contacts;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ContactsController : BaseController
  {
    [HttpGet]
    [Authorize(Policy = "IsAdmin")]
    public async Task<ActionResult<List<ContactDto>>> List()
    {
      return await Mediator.Send(new List.Query());
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "IsAdmin")]
    public async Task<ActionResult<ContactDto>> Details(Guid id)
    {
      return await Mediator.Send(new Details.Query { Id = id });
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult<Unit>> Create(Create.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "IsAdmin")]

    public async Task<ActionResult<Unit>> Delete(Guid id)
    {
      return await Mediator.Send(new Delete.Command { Id = id });
    }
  }
}