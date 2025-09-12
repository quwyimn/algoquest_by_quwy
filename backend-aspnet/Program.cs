using backend_aspnet.Models;
using backend_aspnet.Services;

var builder = WebApplication.CreateBuilder(args);

// --- CẤU HÌNH CORS "MỞ" ---
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // Chỉ cho phép frontend của bạn
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
// ---------------------------

// --- ĐĂNG KÝ CÁC DỊCH VỤ ---
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"));
builder.Services.AddSingleton<MongoDbService>();
builder.Services.AddControllers();
// ---------------------------

var app = builder.Build();

// --- CẤU HÌNH PIPELINE ---
// app.UseHttpsRedirection(); // Tắt đi để tránh lỗi

// --- SỬ DỤNG CORS ---
app.UseCors();
// --------------------

app.UseAuthorization();
app.MapControllers();
// ---------------------------

app.Run();