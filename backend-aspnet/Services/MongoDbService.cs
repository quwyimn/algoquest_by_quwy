using backend_aspnet.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace backend_aspnet.Services;

public class MongoDbService
{
    private readonly IMongoCollection<User> _usersCollection;
    private readonly IMongoCollection<Stage> _stagesCollection;
    private readonly IMongoCollection<Quiz> _quizzesCollection;

    public MongoDbService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionString);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);

        _usersCollection = database.GetCollection<User>("users");
        _stagesCollection = database.GetCollection<Stage>("stages");
        _quizzesCollection = database.GetCollection<Quiz>("quizzes");
    }


    public async Task CreateUserAsync(User user)
    {
        await _usersCollection.InsertOneAsync(user);
        return;
    }
    
    
// Lấy tất cả màn chơi, sắp xếp theo thứ tự
    public async Task<List<Stage>> GetStagesAsync() =>
    await _stagesCollection.Find(_ => true).SortBy(s => s.Order).ToListAsync();

// Lấy tất cả câu đố của một màn chơi
    public async Task<List<Quiz>> GetQuizzesByStageIdAsync(string stageId) =>
    await _quizzesCollection.Find(q => q.StageId == stageId).ToListAsync();

// Tìm một người dùng bằng email
    public async Task<User?> GetUserByEmailAsync(string email) =>
    await _usersCollection.Find(u => u.Email == email).FirstOrDefaultAsync();

// Cập nhật điểm XP cho người dùng
    public async Task UpdateUserXpAsync(string userId, int xpEarned)
{
    
    if (!ObjectId.TryParse(userId, out _))
    {
   
        Console.WriteLine($"Invalid UserId format: {userId}");
        return;
    }

    var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
    var update = Builders<User>.Update.Inc(u => u.Xp, xpEarned);
    await _usersCollection.UpdateOneAsync(filter, update);
}
} 