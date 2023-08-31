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
        public async Task<IActionResult> GetActivity(Guid id)
        {
            //return await _context.Activities.FindAsync(id);
            //if we weren't using the CQRS pattern, the best way to handle validation would be:
            // var activity = await Mediator.Send(new Details.Query { Id = id });
            // if (activity == null) return NotFound();
            // return activity;
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        // the [ApiController] attribute in the BaseApiController knows that it needs to look inside the body of the request to get the activity object.
        // Another option is to pass a hint to the activity object: ...CreateActivity([FromBody]Activity activity) 
        //but because of the [ApiController] attribute we shouldn't need it
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}