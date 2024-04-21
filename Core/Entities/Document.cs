namespace Core.Entities;

public class Document : BaseEntity
{
    public required byte[] Content { get; set; }
    public required string Name { get; set; }
    public required string Extension { get; set; }
    public required decimal Size { get; set; }
    public required DateTime UploadTime { get; set; }

    public required int TopicId { get; set; }
    public Topic Topic { get; set; } = null!;
}