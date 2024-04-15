using Core.Entities;

namespace Core.Interfaces;

public interface ICourseRepository
{
    Task<Course> AddCourseAsync(Course course);
    Task<UserCourse> AddUserToCourseAsync(UserCourse userCourse);
    Task<Course?> GetCourseByIdAsync(int courseId);
    Task<int> GetTotalCourseCountAsync(string userId);
    Task<IReadOnlyList<Course>> GetCoursesAsync(string userId, int pageIndex, int pageSize);
    Task<bool> IsCreator(int courseId, string userId);
}