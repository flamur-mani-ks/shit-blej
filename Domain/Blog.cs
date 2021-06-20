using System;
using System.Collections.Generic;

namespace Domain
{
  public class Blog
  {
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public string Category { get; set; }
    public DateTime Date { get; set; }

    public virtual ICollection<UserBlog> UserBlogs { get; set; }
  }
}