namespace API.DTOs;

public class DocumentDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Extension { get; set; }
    public decimal Size { get; set; }
    public DateTime UploadTime { get; set; }
    public int TopicId { get; set; }
}