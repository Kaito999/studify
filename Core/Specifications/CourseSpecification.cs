using Core.Entities;

namespace Core.Specifications;

public class CourseSpecification : BaseSpecification<Course>
{
    public CourseSpecification(CourseSpecParams courseSpecParams)
    {
        AddInclude(x => x.Topics);
        ApplyPaging(courseSpecParams.PageSize * (courseSpecParams.PageIndex - 1), courseSpecParams.PageSize);
        AddOrderBy(x => x.Title);
    }
}