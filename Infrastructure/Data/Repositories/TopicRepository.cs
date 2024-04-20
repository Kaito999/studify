using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class TopicRepository : ITopicRepository
    {
        private readonly StudyContext _context;
        public TopicRepository(StudyContext context)
        {
            _context = context;
        }

        public async Task<Feedback> AddFeedbackAsync(Feedback feedback)
        {
            await _context.Feedbacks.AddAsync(feedback);
            await _context.SaveChangesAsync();
            return feedback;
        }

        public async Task<IReadOnlyList<Feedback>> GetFeedbacksByTopicIdAsync(int topicId)
        {
            return await _context.Feedbacks.Where(f => f.TopicId == topicId).ToListAsync();
        }

        public async Task<IReadOnlyList<Topic>> GetTopicsByCourseIdAsync(int courseId)
        {
            return await _context.Topics.Where(t => t.CourseId == courseId).ToListAsync();
        }
    }
}