using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using backend_aspnet.Models;
using backend_aspnet.Services;

namespace backend_aspnet.Controllers;

public class LoginRequest
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class UpdateProgressRequest
{
    public string UserId { get; set; } = null!;
    public int XpEarned { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    public UsersController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User newUser)
    {
        newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
        await _mongoDbService.CreateUserAsync(newUser);
        return StatusCode(201, newUser);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        var user = await _mongoDbService.GetUserByEmailAsync(loginRequest.Email);

        if (user is null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
        {
            return BadRequest(new { message = "Email hoặc mật khẩu không đúng!" });
        }

        // ĐÃ SỬA LẠI Ở ĐÂY
        var userResponse = new {
            id = user.Id,
            username = user.Username,
            email = user.Email,
            role = user.Role // Thêm trường "role" vào dữ liệu trả về
        };

        return Ok(new { message = "✅ Đăng nhập thành công!", user = userResponse });
    }

    [HttpPost("update-progress")]
    public async Task<IActionResult> UpdateProgress([FromBody] UpdateProgressRequest request)
    {
        await _mongoDbService.UpdateUserXpAsync(request.UserId, request.XpEarned);
        return Ok(new { message = "Cập nhật tiến độ thành công!" });
    }
}