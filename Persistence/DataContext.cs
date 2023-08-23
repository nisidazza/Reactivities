using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            // one of this options we need is the connection string
        }

        public DbSet<Activity> Activities { get; set; } // it represents the table name once the DB is created
    }
}