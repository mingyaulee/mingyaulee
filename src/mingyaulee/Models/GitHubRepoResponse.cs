using System.Text.Json.Serialization;

namespace mingyaulee.Models
{
    public class GitHubRepoResponse
    {
        public string Name { get; set; }
        public string Description { get; set; }

        [JsonPropertyName("html_url")]
        public string HtmlUrl { get; set; }
        public int Forks { get; set; }
        public int Watchers{ get; set; }
    }
}
