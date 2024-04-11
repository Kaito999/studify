using Core.Entities;

namespace Core.Interfaces;

public interface ICourseRepository
{
    Task<Course> AddCourseAsync(Course course);
    Task<UserCourse> AddUserToCourseAsync(UserCourse userCourse);
    Task<Course?> GetCourseByIdAsync(int courseId, string userId);
    Task<IReadOnlyList<Course>> GetCoursesAsync();
    Task<bool> IsCreator(int courseId, string userId);
}