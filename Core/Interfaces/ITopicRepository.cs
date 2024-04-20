using Core.Entities;

namespace Core.Interfaces;

public interface ITopicRepository
{
    Task<IReadOnlyList<Topic>> GetTopicsByCourseIdAsync(int courseId);
}