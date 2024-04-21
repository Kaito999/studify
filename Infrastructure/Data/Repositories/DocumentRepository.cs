using Core.Interfaces;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class DocumentRepository : IDocumentRepository
{
    private readonly StudyContext _context;
    public DocumentRepository(StudyContext context)
    {
        _context = context;
    }

    public async Task<Document> AddDocumentAsync(Document document)
    {
        _context.Documents.Add(document);
        await _context.SaveChangesAsync();
        return document;
    }

    public async Task DeleteDocument(int documentId)
    {
        var document = await _context.Documents.FindAsync(documentId);
        _context.Documents.Remove(document!);
        await _context.SaveChangesAsync();
    }

    public async Task<Document> GetDocumentByIdAsync(int documentId)
    {
        var document = await _context.Documents.FindAsync(documentId);
        return document!;
    }

    public async Task<IReadOnlyList<Document>> ListDocumentsAsync(int topicId)
    {
        return await _context.Documents.ToListAsync();
    }
}