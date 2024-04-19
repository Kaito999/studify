namespace Infrastructure.Data
{
    public class TopicRepository
    {
        private readonly StudyContext _context;
        public TopicRepository(StudyContext context)
        {
            _context = context;
        }



    }
}