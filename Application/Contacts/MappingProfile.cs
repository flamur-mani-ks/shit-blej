using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Contacts
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<Contact, ContactDto>();
    }
  }
}