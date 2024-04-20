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

        public async Task<IReadOnlyList<Topic>> GetTopicsByCourseIdAsync(int courseId)
        {
            return await _context.Topics.Where(t => t.CourseId == courseId).ToListAsync();
        }
    }
}