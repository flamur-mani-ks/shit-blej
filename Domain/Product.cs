using System;

namespace Domain
{
  public class Product
  {
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public double Price { get; set; }
    // public bool IsForSale { get; set; } //is the product for sale or for rent
    // public bool IsNew { get; set; } //is the product new or used
    public string City { get; set; }
    public DateTime Date { get; set; }
  }
}