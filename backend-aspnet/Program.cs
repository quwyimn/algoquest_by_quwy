// Import các thư viện cần thiết
using backend_aspnet.Models;
using backend_aspnet.Services;

var builder = WebApplication.CreateBuilder(args);

// --- CẤU HÌNH CORS ---
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173") // Cho phép frontend của bạn
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
// ---------------------


// --- ĐĂNG KÝ CÁC DỊCH VỤ ---
// Đọc cấu hình MongoDB từ appsettings.json
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"));
// Đăng ký dịch vụ MongoDbService
builder.Services.AddSingleton<MongoDbService>();
// Đăng ký các Controllers (như UsersController)
builder.Services.AddControllers();
// ---------------------------


// Cấu hình Swagger để test API (tương tự Postman)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --- XÂY DỰNG ỨNG DỤNG ---
var app = builder.Build();

// Cấu hình pipeline xử lý request
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Sử dụng CORS đã cấu hình ở trên
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

// Ánh xạ các request tới Controllers
app.MapControllers();

// Chạy ứng dụng
app.Run();