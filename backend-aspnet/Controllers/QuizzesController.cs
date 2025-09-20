using Microsoft.AspNetCore.Mvc;
using backend_aspnet.Models;
using backend_aspnet.Services;

namespace backend_aspnet.Controllers;

// TẠO MỘT LỚP DTO MỚI Ở ĐÂY
public class CreateQuizRequest
{
    public string StageId { get; set; } = null!;
    public string Question { get; set; } = null!;
    public List<string> Options { get; set; } = null!;
    public int CorrectAnswer { get; set; }
    public string? Difficulty { get; set; }
    public string? BloomTag { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class QuizzesController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    public QuizzesController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }

    [HttpGet("{stageId}")]
    public async Task<List<Quiz>> GetByStageId(string stageId)
    {
        try
        {
            return await _mongoDbService.GetQuizzesByStageIdAsync(stageId);
        }
        catch
        {
            // Fallback to mock data if MongoDB fails
            return MockDataService.GetMockQuizzes(stageId);
        }
    }

    // SỬA LẠI HÀM POST ĐỂ DÙNG DTO MỚI
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateQuizRequest request)
    {
        var newQuiz = new Quiz
        {
            StageId = request.StageId,
            Question = request.Question,
            Options = request.Options,
            CorrectAnswer = request.CorrectAnswer,
            Difficulty = request.Difficulty ?? "Dễ",
            bloomtag = request.BloomTag ?? "Nhớ"
        };

        await _mongoDbService.CreateQuizAsync(newQuiz);
        return CreatedAtAction(nameof(GetByStageId), new { stageId = newQuiz.StageId }, newQuiz);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuiz(string id)
    {
        await _mongoDbService.DeleteQuizAsync(id);
        return NoContent();
    }
}