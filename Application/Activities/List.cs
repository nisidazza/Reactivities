using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List // it's a Query Handler , it gets data from the API, in this case a list of activities
    {
        public class Query : IRequest<Result<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            // we need a constructor in order to get access to the data context
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //Eagerly Loading
                // var activities = await _context.Activities
                // .Include(a => a.Attendees)
                // .ThenInclude(u => u.AppUser)
                // .ToListAsync();

                //instead og above, automapper extension allows us to project to an entity or a class (activity dto)
                // in this way we are getting only the properties we are interested in 
                var activities = await _context.Activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);


                //var activitiesToReturn = _mapper.Map<List<ActivityDto>>(activities); we don't need this mapping function as now activities is of type ActivityDto
                //this handle method returns a list of activities
                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}