using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Jobs
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<Job, JobDto>();
      CreateMap<UserJob, AttendeeDto>()
          .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
          .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
          .ForMember(d => d.PhoneNumber, o => o.MapFrom(s => s.AppUser.PhoneNumber))
          .ForMember(d => d.City, o => o.MapFrom(s => s.AppUser.City))
          .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
    }
  }
}