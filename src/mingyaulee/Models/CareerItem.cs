using System;
using System.Collections.Generic;

namespace mingyaulee.Models
{
    public class CareerItem
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public bool IsCurrent { get; set; }
        public string Title { get; set; }
        public string Company { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public IEnumerable<string> Tags { get; set; }
        public IEnumerable<string> Details { get; set; }
    }
}
