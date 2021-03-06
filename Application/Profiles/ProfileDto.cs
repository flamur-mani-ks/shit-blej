using System;
using System.Collections.Generic;
using Domain;

namespace Application.Profiles
{
  public class ProfileDto
  {
    public string DisplayName { get; set; }
    public string Username { get; set; }
    public string Image { get; set; }
    public string PhoneNumber { get; set; }
    public string City { get; set; }
    public string Role { get; set; }
    public ICollection<Photo> Photos { get; set; }
  }
}