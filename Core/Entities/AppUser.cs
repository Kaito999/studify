using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities;

public class AppUser : IdentityUser
{
    [Required]
    public required string Nickname { get; set; }

    public string? ProfilePictureUrl { get; set; }

    [JsonIgnore]
    public List<Course>? Courses { get; set; } = [];
}