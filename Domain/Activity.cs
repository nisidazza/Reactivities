namespace Domain
{
    public class Activity
    {
        // [Key]: you can use this attribute to specify something different from Id if needed
        public Guid Id { get; set; } // primary key of database table

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }

        // this avoids getting a null reference when we add something to this collection
        public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();
    }
}