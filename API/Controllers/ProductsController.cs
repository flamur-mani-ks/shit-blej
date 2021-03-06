using System;
using System.Threading.Tasks;
using Application.Products;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ProductsController : BaseController
  {

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List.ProductsEnvelope>> List(int? limit, int? offset, string category, string city)
    {
      return await Mediator.Send(new List.Query(limit, offset, category, city));
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> Details(Guid id)
    {
      return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<Unit>> Create(Create.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "IsProductOwner")]
    public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
    {
      command.Id = id;
      return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "IsProductOwner")]
    public async Task<ActionResult<Unit>> Delete(Guid id)
    {
      return await Mediator.Send(new Delete.Command { Id = id });
    }

    


  }
}