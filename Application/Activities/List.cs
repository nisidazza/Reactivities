using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class List // it's a Query Handler , it gets data from the API, in this case a list of activities
    {
        public class Query : IRequest<Result<PagedList<ActivityDto>>>
        {
            public ActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
        {
            // we need a constructor in order to get access to the data context
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //Eagerly Loading
                // var activities = await _context.Activities
                // .Include(a => a.Attendees)
                // .ThenInclude(u => u.AppUser)
                // .ToListAsync();

                //instead og above, automapper extension allows us to project to an entity or a class (activity dto)
                // in this way we are getting only the properties we are interested in 
                var query = _context.Activities
                .Where(d => d.Date >= request.Params.StartDate) // showing future events by default
                .OrderBy(d => d.Date)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                .AsQueryable(); //we defer the execution until we create a paged list

                // FILTERS
                //only showing events the user is going to
                if (request.Params.IsGoing && !request.Params.IsHost)
                {
                    query = query.Where(x => x.Attendees.Any(a => a.Username == _userAccessor.GetUsername()));
                }
                //only showing events the user is hosting 
                if (request.Params.IsHost && !request.Params.IsGoing)
                {
                    // because of projection we are working with an ActivityDTO so we have access to HostUsername
                    query = query.Where(x => x.HostUsername == _userAccessor.GetUsername());
                }

                //var activitiesToReturn = _mapper.Map<List<ActivityDto>>(activities); we don't need this mapping function as now activities is of type ActivityDto
                //this handle method returns a list of activities
                return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}