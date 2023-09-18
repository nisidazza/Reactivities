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

        public DbSet<Comment> Comments { get; set; } 

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
            
            //Entity Framework restricts the delete behaviour between user/comments and activity/comments. If a user or an actvity is deleted, the comments won't be.
            // Change the above behaviour manually so that when an activity is deleted , all the related comments are too.
            builder.Entity<Comment>()
            .HasOne(a => a.Activity)
            .WithMany(c => c.Comments)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}