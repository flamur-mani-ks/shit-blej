using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Application.Blogs
{
    public class BlogDto
    {
         public Guid Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string  Category { get; set; }
        public DateTime Date { get; set; }

        [JsonProperty("attendees")]
        public virtual ICollection<AttendeeDto> UserBlogs { get; set; }
    }
}