using Core.Entities;

namespace Core.Interfaces;

public interface ICourseRepository
{
    Task<Course> AddCourseAsync(Course course);
    Task<UserCourse> AddUserToCourseAsync(UserCourse userCourse);
    Task<Course?> GetCourseByIdAsync(int courseId);
    Task<IReadOnlyList<Course>> GetCoursesAsync();
    Task<IReadOnlyList<Course>> GetCourses(string userId);
    Task<bool> IsCreator(int courseId, string userId);
}