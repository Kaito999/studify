using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CourseDto
{
    [Required]
    public required string Title { get; set; }
}