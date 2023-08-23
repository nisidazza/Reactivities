using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        // make use of dependency injection in order to inject the data context inside the API Controller class
        private readonly DataContext _context;

        public ActivitiesController(DataContext context)
        {
            _context = context;

        }

        //endpoint
        [HttpGet] // api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] // api/activities/{id}
        public async Task<ActionResult<Activity>>GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}