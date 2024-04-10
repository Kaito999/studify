namespace Core.Interfaces;

public interface IGenericRepository<T>
{
    Task<T> GetByIdAsync(int id);
    Task<IReadOnlyList<T>> ListAllAsync();
}