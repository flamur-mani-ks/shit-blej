using System;

namespace Domain
{
  public class UserProduct
  {
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; }
    public bool IsOwner { get; set; }
  }
}