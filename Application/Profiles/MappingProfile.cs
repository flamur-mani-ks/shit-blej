using AutoMapper;
using Domain;
using System.Linq;
public class MappingProfile : Profile
{
  public MappingProfile()
  {
    CreateMap<AppUser, Application.Profiles.ProfileDto>()
        .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
  }
}