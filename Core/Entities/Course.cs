using System.Text.Json.Serialization;

namespace Core.Entities;

public class Course : BaseEntity
{
    public required string Title { get; set; }
    public string? ImageUrl { get; set; }

    public required string CreatorId { get; set; }
    public AppUser? Creator { get; set; }

    [JsonIgnore]
    public List<Topic>? Topics { get; set; } = [];
}