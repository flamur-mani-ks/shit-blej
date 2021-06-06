using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
  public class List
  {
    public class ProductsEnvelope
    {
      public List<ProductDto> Products { get; set; }
      public int ProductCount { get; set; }
    }
    public class Query : IRequest<ProductsEnvelope>
    {
      public Query(int? limit, int? offset, string category, string city)
      {
        Limit = limit;
        Offset = offset;
        Category = category;
        City = city;
      }

      public int? Limit { get; set; }
      public int? Offset { get; set; }
      public string Category { get; set; }
      public string City { get; set; }
    }

    public class Handler : IRequestHandler<Query, ProductsEnvelope>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<ProductsEnvelope> Handle(Query request, CancellationToken cancellationToken)
      {
        var queryable = _context.Products
          .AsQueryable();

        if (request.Category != null && request.City == null)
        {
          queryable = queryable.Where(x => x.Category == request.Category);
        }

        if (request.Category == null && request.City != null)
        {
          queryable = queryable.Where(x => x.City == request.City);
        }

        if (request.Category != null && request.City != null)
        {
          queryable = queryable.Where(x => x.Category == request.Category && x.City == request.City);
        }

        var products = await queryable
          .Skip(request.Offset ?? 0)
          .Take(request.Limit ?? 3).ToListAsync();

        return new ProductsEnvelope
        {
          Products = _mapper.Map<List<Product>, List<ProductDto>>(products),
          ProductCount = queryable.Count()
        };
      }
    }
  }
}