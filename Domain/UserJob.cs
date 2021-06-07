using System;

namespace Domain
{
  public class UserJob
  {
    public string AppUserId { get; set; }
    public virtual AppUser AppUser { get; set; }
    public Guid JobId { get; set; }
    public virtual Job Job { get; set; }
    public bool IsOwner { get; set; }
  }
}