namespace API.DTOs;

public class CourseCreatorDto
{
    public required string Nickname { get; set; }
    public required string Email { get; set; }
    public string? ProfilePictureUrl { get; set; }
}