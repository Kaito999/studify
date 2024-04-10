using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities;

public class AppUser : IdentityUser
{
    [Required]
    public required string Nickname { get; set; }
    public List<Course>? Courses { get; set; } = [];
}