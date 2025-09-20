using Microsoft.AspNetCore.Mvc;
using backend_aspnet.Models;
using backend_aspnet.Services;

namespace backend_aspnet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StagesController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    public StagesController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }

    // API cho Player: Lấy tất cả màn chơi
    [HttpGet]
    public async Task<List<Stage>> Get()
    {
        try
        {
            return await _mongoDbService.GetStagesAsync();
        }
        catch
        {
            // Fallback to mock data if MongoDB fails
            return MockDataService.GetMockStages();
        }
    }

    // API cho Admin: Thêm một màn chơi mới
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Stage stage)
    {
        await _mongoDbService.CreateStageAsync(stage);
        return CreatedAtAction(nameof(Get), new { id = stage.Id }, stage);
    }
    // DELETE /api/stages/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStage(string id)
    {
        await _mongoDbService.DeleteStageAsync(id);
        return NoContent(); // Trả về 204 No Content khi xóa thành công
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStage(string id, [FromBody] Stage updatedStage)
    {
        await _mongoDbService.UpdateStageAsync(id, updatedStage);
        return NoContent(); // Trả về 204 No Content khi sửa thành công
    }
}