using Microsoft.AspNetCore.Mvc;
using backend_aspnet.Models;
using backend_aspnet.Services;

namespace backend_aspnet.Controllers;

[ApiController]
[Route("api/[controller]")] // -> /api/quizzes
public class QuizzesController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    public QuizzesController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }

    // GET /api/quizzes/{stageId}
    [HttpGet("{stageId}")]
    public async Task<List<Quiz>> GetByStageId(string stageId) =>
        await _mongoDbService.GetQuizzesByStageIdAsync(stageId);
}