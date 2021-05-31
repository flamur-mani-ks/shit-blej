using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
  public class AppUser : IdentityUser
  {
    public string DisplayName { get; set; }
    public string City { get; set; }

    public virtual ICollection<UserProduct> UserProducts { get; set; }
  }
}