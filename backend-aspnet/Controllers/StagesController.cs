using Microsoft.AspNetCore.Mvc;
using backend_aspnet.Models;
using backend_aspnet.Services;

namespace backend_aspnet.Controllers;

[ApiController]
[Route("api/[controller]")] // -> /api/stages
public class StagesController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    public StagesController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }

    // GET /api/stages
    [HttpGet]
    public async Task<List<Stage>> Get() =>
        await _mongoDbService.GetStagesAsync();
}