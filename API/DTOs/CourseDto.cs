using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace API.DTOs;

public class CourseDto
{
    [Required]
    public int CourseId { get; set; }
    public required string CreatorId { get; set; }
    public required string Title { get; set; }
    public string? ImageUrl { get; set; }
    public List<Topic>? Topics { get; set; }
}