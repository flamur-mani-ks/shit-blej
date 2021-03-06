using System;

namespace Domain
{
  public class UserBlog
  {
    public string AppUserId { get; set; }
    public virtual AppUser AppUser { get; set; }
    public Guid BlogId { get; set; }
    public virtual Blog Blog { get; set; }
    public bool IsAuthor { get; set; }
  }
}