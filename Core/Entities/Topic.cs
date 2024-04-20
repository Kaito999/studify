using System.Text.Json.Serialization;

namespace Core.Entities;

public class Topic : BaseEntity
{
    public required string Title { get; set; }

    public required int CourseId { get; set; }
    public Course Course { get; set; } = null!;

    [JsonIgnore]
    public List<Document>? Documents { get; set; } = [];
    [JsonIgnore]
    public List<Feedback>? Feedbacks { get; set; } = [];
}