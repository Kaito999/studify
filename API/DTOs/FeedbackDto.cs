namespace API.DTOs;

public class FeedbackDto
{
    public required int TopicId { get; set; }
    public required string Text { get; set; }
    public required DateTime UploadTime { get; set; }
}