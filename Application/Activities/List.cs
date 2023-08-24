using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List // it's a Query Handler , it gets data from the API, in this case a list of activities
    {
        public class Query : IRequest<List<Activity>> { }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            // we need a constructor in order to get access to the data context
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                //this handle method returns a list of activities
                return await _context.Activities.ToListAsync();
            }
        }
    }
}