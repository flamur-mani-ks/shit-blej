using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Blogs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class BlogsController : BaseController
  {
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<BlogDto>>> List()
    {
      return await Mediator.Send(new List.Query());
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<BlogDto>> Details(Guid id)
    {
      return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<Unit>> Create(Create.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "IsBlogAuthor")]
    public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
    {
      command.Id = id;
      return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "IsBlogAuthor")]
    public async Task<ActionResult<Unit>> Delete(Guid id)
    {
      return await Mediator.Send(new Delete.Command { Id = id });
    }
  }
}