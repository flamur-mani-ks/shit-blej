using System;
using System.Collections.Generic;

namespace Domain
{
    public class Job
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string  Category { get; set; }
        public string City { get; set; }
        public string WorkingHours { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; }

        public virtual ICollection<UserJob> UserJobs { get; set; }
    }
}