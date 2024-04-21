using Core.Entities;

namespace Core.Interfaces;

public interface IDocumentRepository
{
    Task<Document> GetDocumentByIdAsync(int documentId);
    Task<Document> AddDocumentAsync(Document document);
    Task<IReadOnlyList<Document>> ListDocumentsAsync(int topicId);
    Task DeleteDocument(int documentId);
}