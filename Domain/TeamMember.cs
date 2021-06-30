using System;

namespace Domain
{
    public class TeamMember
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Position { get; set; }
        public string Bio { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Github { get; set; }
        public string LinkedIn { get; set; }
    }
}