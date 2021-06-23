using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
  public class AppUser : IdentityUser
  {
    public string DisplayName { get; set; }
    public string City { get; set; }
    public string Role { get; set; }
    public virtual ICollection<Photo> Photos { get; set; }
    public virtual ICollection<UserProduct> UserProducts { get; set; }
    public virtual ICollection<UserJob> UserJobs { get; set; }
    public virtual ICollection<UserBlog> UserBlogs { get; set; }
    public virtual ICollection<UserFollowing> Followings { get; set; }
    public virtual ICollection<UserFollowing> Followers { get; set; }
  }
}