namespace Core.Entities;

public class Feedback : BaseEntity
{
    public required int TopicId { get; set; }
    public required string Text { get; set; }
    public int SentimentLabel { get; set; }
    public double LabelScore { get; set; }
    public required DateTime UploadTime { get; set; }
}