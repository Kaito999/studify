using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class CourseRepository : ICourseRepository
{
    private readonly StudyContext _context;
    public CourseRepository(StudyContext context)
    {
        _context = context;
    }

    public async Task<bool> IsCreator(int courseId, string userId)
    {
        return await _context.Courses
                            .Where(c => c.Id == courseId && c.CreatorId == userId)
                            .FirstOrDefaultAsync() != null;
    }

    public async Task<Course> AddCourseAsync(Course course)
    {
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return course;
    }

    public async Task<Course?> GetCourseByIdAsync(int courseId, string userId)
    {
        return await _context.Courses.FindAsync(courseId);
    }

    public async Task<UserCourse> AddUserToCourseAsync(UserCourse userCourse)
    {
        _context.UserCourses.Add(userCourse);
        await _context.SaveChangesAsync();
        return userCourse;
    }

    public async Task<IReadOnlyList<Course>> GetCoursesAsync()
    {
        return await _context.Courses.
                    Include(x => x.Topics).
                    ToListAsync();
    }
}