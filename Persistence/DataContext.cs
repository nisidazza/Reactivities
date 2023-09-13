using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            // one of this options we need is the connection string
        }

        public DbSet<Activity> Activities { get; set; } // it represents the table name once the DB is created

        public DbSet<ActivityAttendee> ActivityAttendees { get; set; } // useful if we want to get an attendee but not an activity

        public DbSet<Photo> Photos { get; set; } // if we need to query the photo collection directly from the data context

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // make up a priamry key that it's a combination of user Id and activity Id
            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

            //configure the entity itself
            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Activities)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.Activity)
                .WithMany(a => a.Attendees)
                .HasForeignKey(aa => aa.ActivityId);
        }
    }
}