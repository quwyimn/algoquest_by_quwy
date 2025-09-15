using Microsoft.AspNetCore.Mvc;
using backend_aspnet.Models;
using backend_aspnet.Services;

namespace backend_aspnet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizzesController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    public QuizzesController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }

    // API cho Player: Lấy câu đố của một màn chơi
    [HttpGet("{stageId}")]
    public async Task<List<Quiz>> GetByStageId(string stageId) =>
        await _mongoDbService.GetQuizzesByStageIdAsync(stageId);

    // API cho Admin: Thêm một câu đố mới
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Quiz quiz)
    {
        await _mongoDbService.CreateQuizAsync(quiz);
        return CreatedAtAction(nameof(GetByStageId), new { stageId = quiz.StageId }, quiz);
    }
    // DELETE /api/quizzes/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuiz(string id)
    {
        await _mongoDbService.DeleteQuizAsync(id);
        return NoContent();
    }
}