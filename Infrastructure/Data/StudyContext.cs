using Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class StudyContext : IdentityDbContext<AppUser>
{
    public StudyContext(DbContextOptions<StudyContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<Course> Courses { get; set; }
    public DbSet<Document> Documents { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }
    public DbSet<Topic> Topics { get; set; }
    public DbSet<UserCourse> UserCourses { get; set; }
}