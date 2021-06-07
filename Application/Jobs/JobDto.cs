using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Application.Jobs
{
    public class JobDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string  Category { get; set; }
        public string City { get; set; }
        public string WorkingHours { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; }

        [JsonProperty("attendees")]
        public virtual ICollection<AttendeeDto> UserJobs { get; set; }
    }
}