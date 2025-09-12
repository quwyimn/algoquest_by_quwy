using backend_aspnet.Models;
using backend_aspnet.Services;

var builder = WebApplication.CreateBuilder(args);

// --- THÊM LẠI CẤU HÌNH CORS ---
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          // Cho phép mọi thứ để đơn giản hóa
                          policy.AllowAnyOrigin() 
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
// --------------------------------

// --- ĐĂNG KÝ CÁC DỊCH VỤ ---
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"));
builder.Services.AddSingleton<MongoDbService>();
builder.Services.AddControllers();
// ---------------------------

var app = builder.Build();

// --- CẤU HÌNH PIPELINE ---
app.UseDefaultFiles();
app.UseStaticFiles();

// app.UseHttpsRedirection();

// --- SỬ DỤNG CORS ---
app.UseCors(MyAllowSpecificOrigins);
// --------------------

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");
// ---------------------------

app.Run();