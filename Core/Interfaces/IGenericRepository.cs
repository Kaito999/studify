using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(int id);
    Task<T?> AddAsync(T entity);
    Task DeleteAsync(int id);
    Task<IReadOnlyList<T>> ListAllAsync();
    Task<IReadOnlyList<T>> ListByIdAsync(int id);
    Task<T> GetEntityWithSpec(ISpecification<T> specification);
    Task<IReadOnlyList<T>> ListAsync(ISpecification<T> specification);
}