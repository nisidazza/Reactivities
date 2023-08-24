using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // we are not accessing the Database at this point here, we are just adding the activity in memory, so it doesn't need to be async (AddAsync)
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                // Task<Unit> returns void but it tells the API Controller that this request is finished
                return Unit.Value;
            }
        }
    }
}