using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class CourseRepository : ICourseRepository
{
    private readonly StudyContext _context;
    private readonly UserManager<AppUser> _userManager;
    public CourseRepository(StudyContext context, UserManager<AppUser> userManager)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<bool> IsCreator(int courseId, string userId)
    {
        return await _context.Courses.Where(c => c.Id == courseId && c.CreatorId == userId)
                                    .FirstOrDefaultAsync() != null;
    }

    public async Task<Course> AddCourseAsync(Course course)
    {
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return course;
    }

    public async Task<Course?> GetCourseByIdAsync(int courseId)
    {
        return await _context.Courses.FindAsync(courseId);
    }

    public async Task<UserCourse> AddUserToCourseAsync(UserCourse userCourse)
    {
        _context.UserCourses.Add(userCourse);
        await _context.SaveChangesAsync();
        return userCourse;
    }

    public async Task<IReadOnlyList<Course>> GetCoursesAsync(string userId, int pageIndex, int pageSize)
    {
        return await _context.Courses
            .Where(c => c.CreatorId == userId || _context.UserCourses.Any(uc => uc.CoursesId == c.Id && uc.UsersId == userId))
            .Include(x => x.Topics)!
                .ThenInclude(x => x.Documents)
            .Include(x => x.Topics)!
                .ThenInclude(x => x.Documents)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<int> GetTotalCourseCountAsync(string userId)
    {
        return await _context.Courses
            .Where(c => c.CreatorId == userId || _context.UserCourses.Any(uc => uc.CoursesId == c.Id && uc.UsersId == userId))
            .CountAsync();
    }

    public async Task<string> GetCourseCreatorIdAsync(int courseId)
    {
        var course = await _context.Courses.FindAsync(courseId);
        return course.CreatorId;
    }

    public async Task<List<AppUser>> GetCourseUsersAsync(int courseId)
    {
        var usersIds = await _context.UserCourses
            .Where(uc => uc.CoursesId == courseId)
            .Select(uc => uc.UsersId)
            .ToListAsync();

        var users = new List<AppUser>();

        foreach (var id in usersIds)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                users.Add(user);
            }
        }

        return users;
    }
}