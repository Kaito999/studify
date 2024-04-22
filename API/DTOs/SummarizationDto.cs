namespace API.DTOs;

public class SummarizationDto
{
    public int DocumentId { get; set; }
    public string? Language { get; set; }
    public int SummaryLength { get; set; }

}