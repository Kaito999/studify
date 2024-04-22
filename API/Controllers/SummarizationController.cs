using System.Net.Http.Headers;
using System.Text.Json;
using API.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SummarizationController : BaseController
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IDocumentRepository _documentRepository;

        public SummarizationController(IHttpClientFactory clientFactory, IDocumentRepository documentRepository)
        {
            _documentRepository = documentRepository;
            _clientFactory = clientFactory;
        }

        [HttpPost]
        public async Task<IActionResult> SummarizeDocument([FromQuery] SummarizationDto summarizationDto)
        {
            var document = await _documentRepository.GetDocumentByIdAsync(summarizationDto.DocumentId);
            if (document == null)
            {
                return NotFound();
            }

            var pythonApiUrl = $"http://localhost:5001/summarize?language={summarizationDto.Language}&summaryLength={summarizationDto.SummaryLength}";

            var documentContent = document.Content;

            var request = new HttpRequestMessage(HttpMethod.Post, pythonApiUrl)
            {
                Content = new ByteArrayContent(documentContent)
            };

            request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            var client = _clientFactory.CreateClient();
            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var summary = JsonSerializer.Deserialize<dynamic>(content);
                return Ok(summary);
            }
            else
            {
                return StatusCode((int)response.StatusCode, response.ReasonPhrase);
            }
        }
    }
}
