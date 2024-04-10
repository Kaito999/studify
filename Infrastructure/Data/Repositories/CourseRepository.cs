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

    public async Task<Course> AddCourseAsync(Course course)
    {
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return course;
    }

    public async Task<Course> GetCourseByIdAsync(int id)
    {
        return await _context.Courses.FindAsync(id);
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