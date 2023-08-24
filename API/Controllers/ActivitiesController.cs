using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        // make use of dependency injection in order to inject the data context inside the API Controller class
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //endpoint
        [HttpGet] // api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            // sends the List Query to the mediator.Handler()
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // api/activities/{id}
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            //return await _context.Activities.FindAsync(id);
            return Ok();
        }
    }
}