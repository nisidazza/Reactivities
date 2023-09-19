using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
            .ForMember(destination => destination.HostUsername,
                opt => opt.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
            .ForMember(d => d.DisplayName, opt => opt.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, opt => opt.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, opt => opt.MapFrom(s => s.AppUser.Bio))
            .ForMember(d => d.Image, opt => opt.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(d => d.Image, opt => opt.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count));

            CreateMap<Comment, CommentDto>()
            .ForMember(d => d.DisplayName, opt => opt.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.Username, opt => opt.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.Image, opt => opt.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}