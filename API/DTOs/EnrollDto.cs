namespace API.DTOs;

public class EnrollDto
{
    public int CourseId { get; set; }
    public required string UserEmail { get; set; }
}