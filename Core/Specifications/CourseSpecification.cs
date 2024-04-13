using Core.Entities;

namespace Core.Specifications;

public class CourseSpecification : BaseSpecification<Course>
{
    public CourseSpecification()
    {
        AddInclude(x => x.Topics);
    }
}