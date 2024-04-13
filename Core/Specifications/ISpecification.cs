using System.Linq.Expressions;

namespace Core.Specifications;

public interface ISpecification<T>
{
    Expression<Func<T, bool>> Criteria { get; }
    List<Expression<Func<T, object>>> Includes { get; }
    public int Take { get; }
    public int Skip { get; }
    bool IsPagingEnabled { get; }
}