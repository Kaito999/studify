using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    private readonly StudyContext _context;
    public GenericRepository(StudyContext context)
    {
        _context = context;
    }

    public async Task<T?> AddAsync(T entity)
    {
        await _context.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<T?> GetByIdAsync(int id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<IReadOnlyList<T>> ListAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T> GetEntityWithSpec(ISpecification<T> specification)
    {
        return await ApplySpecification(specification).FirstOrDefaultAsync();
    }

    public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> specification)
    {
        return await ApplySpecification(specification).ToListAsync();
    }

    public async Task<int> CountAsync(ISpecification<T> spec)
    {
        return await ApplySpecification(spec).CountAsync();
    }

    private IQueryable<T> ApplySpecification(ISpecification<T> specification)
    {
        return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), specification);
    }
}