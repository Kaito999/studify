namespace Core.Entities;

public class Topic : BaseEntity
{
    public required string Title { get; set; }

    public required int CourseId { get; set; }
    public Course Course { get; set; } = null!;

    public List<Document> Documents { get; set; } = [];
    public List<Feedback> Feedbacks { get; set; } = [];
}