using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        //endpoint
        [HttpGet] // api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            // sends the List Query to the mediator.Handler()
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // api/activities/{id}
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            //return await _context.Activities.FindAsync(id);
            return Ok();
        }
    }
}