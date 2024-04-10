using Core.Entities;

namespace Core.Interfaces;

public interface ICourseRepository
{
    Task<Course> AddCourseAsync(Course course);
    Task<UserCourse> AddUserToCourseAsync(UserCourse userCourse);
    Task<Course> GetCourseByIdAsync(int id);
    Task<IReadOnlyList<Course>> GetCoursesAsync();
}