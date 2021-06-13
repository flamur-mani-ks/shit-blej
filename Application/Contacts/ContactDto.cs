using System;

namespace Application.Contacts
{
  public class ContactDto
  {
    public Guid Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Message { get; set; }
    public string PhoneNumber { get; set; }
    public string City { get; set; }
    public DateTime Date { get; set; }
  }
}