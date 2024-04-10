namespace API.DTOs;

public class EnrollDto
{
    public required string UserEmail { get; set; }
    public int CourseId { get; set; }
}