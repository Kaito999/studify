using Core.Entities;

namespace Core.Interfaces;

public interface ITopicRepository
{
    Task<IReadOnlyList<Topic>> GetTopicsByCourseIdAsync(int courseId);
    Task<Feedback> AddFeedbackAsync(Feedback feedback);
    Task<IReadOnlyList<Feedback>> GetFeedbacksByTopicIdAsync(int topicId);
}