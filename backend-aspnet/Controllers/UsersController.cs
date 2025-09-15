using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using backend_aspnet.Models;
using backend_aspnet.Services;

namespace backend_aspnet.Controllers; // BẮT ĐẦU NAMESPACE

// --- CÁC LỚP DTO (Data Transfer Object) ĐƯỢC ĐẶT Ở ĐÂY ---
public class LoginRequest
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class UpdateProgressRequest
{
    public string UserId { get; set; } = null!;
    public int XpEarned { get; set; }
    public string CompletedStageId { get; set; } = null!; 
}
// ---------------------------------------------------------


[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    public UsersController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }

    // GET /api/users
    [HttpGet]
    public async Task<List<User>> Get() =>
        await _mongoDbService.GetAllUsersAsync();

    // POST /api/users/register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User newUser)
    {
        newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
        await _mongoDbService.CreateUserAsync(newUser);
        return StatusCode(201, newUser);
    }

    // POST /api/users/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        var user = await _mongoDbService.GetUserByEmailAsync(loginRequest.Email);

        if (user is null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
        {
            return BadRequest(new { message = "Email hoặc mật khẩu không đúng!" });
        }

        var userResponse = new
        {
            id = user.Id,
            username = user.Username,
            email = user.Email,
            role = user.Role
        };

        return Ok(new { message = "✅ Đăng nhập thành công!", user = userResponse });
    }

    // POST /api/users/update-progress
    [HttpPost("update-progress")]
    public async Task<IActionResult> UpdateProgress([FromBody] UpdateProgressRequest request)
    {
        // SỬA LẠI ĐỂ GỌI ĐÚNG HÀM MỚI NHẤT
        await _mongoDbService.UpdateUserProgressAsync(request.UserId, request.XpEarned, request.CompletedStageId);
        return Ok(new { message = "Cập nhật tiến độ thành công!" });
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(string id)
    {
        var user = await _mongoDbService.GetUserByIdAsync(id);
        if (user is null)
    {
        return NotFound();
    }
        return user;    
    }
}