using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CourseCreationDto
{
    [Required]
    public required string Title { get; set; }
    public int CourseId { get; set; }
}