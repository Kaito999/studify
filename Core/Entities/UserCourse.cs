namespace Core.Entities;

public class UserCourse : BaseEntity
{
    public required string UsersId { get; set; }
    public int CoursesId { get; set; }
    public required AppUser User { get; set; } = null!;
    public required Course Course { get; set; } = null!;
}