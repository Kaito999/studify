using Core.Interfaces;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;

namespace API.Controllers;

public class DocumentsController : BaseController
{
    private readonly IDocumentRepository _documentRepository;

    public DocumentsController(IDocumentRepository documentRepository)
    {
        _documentRepository = documentRepository;
    }

    [HttpGet]
    [Route("{fileId}")]
    public async Task<IActionResult> DownloadDocument(int fileId)
    {
        var document = await _documentRepository.GetDocumentByIdAsync(fileId);

        if (document == null) return NotFound();

        return File(document.Content, "application/octet-stream", document.Name);
    }

    [HttpGet]
    [Route("metadata/{topicId}")]
    public async Task<ActionResult<IReadOnlyList<DocumentDto>>> GetDocumentsMetadata(int topicId)
    {
        var documents = await _documentRepository.ListDocumentsAsync(topicId);

        var result = documents.Select(document => new DocumentDto
        {
            Id = document.Id,
            Name = document.Name,
            Extension = document.Extension,
            Size = document.Size,
            UploadTime = document.UploadTime,
            TopicId = topicId,
        }).ToList();

        return Ok(result);
    }

    [HttpPost]
    [Route("upload")]
    public async Task<IActionResult> UploadDocument([FromForm] List<IFormFile> files, [FromForm] int topicId)
    {
        if (files == null || files.Count == 0)
            return BadRequest("No file uploaded.");

        foreach (var file in files)
        {
            byte[] fileData;
            using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                fileData = ms.ToArray();
            }

            var newDocument = new Document
            {
                Name = file.FileName,
                Extension = Path.GetExtension(file.FileName),
                Size = file.Length,
                UploadTime = DateTime.UtcNow,
                Content = fileData,
                TopicId = topicId
            };

            await _documentRepository.AddDocumentAsync(newDocument);
        }

        return Ok();
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _documentRepository.DeleteDocument(id);
        return Ok();
    }
}