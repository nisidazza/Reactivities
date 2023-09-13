using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>().ForMember(destination => destination.HostUsername,
                opt => opt.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, Profiles.Profile>().ForMember(d => d.DisplayName, opt => opt.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, opt => opt.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, opt => opt.MapFrom(s => s.AppUser.Bio));

            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(d => d.Image, opt => opt.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}