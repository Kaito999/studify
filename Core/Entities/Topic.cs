namespace Core.Entities;

public class Topic : BaseEntity
{
    public required string Title { get; set; }

    public required int CourseId { get; set; }
    public required Course Course { get; set; }

    public List<Document> Documents { get; set; } = [];
    public List<Feedback> Feedbacks { get; set; } = [];
}