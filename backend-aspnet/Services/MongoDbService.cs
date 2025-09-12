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

    // --- CÁC HÀM PHẢI NẰM BÊN TRONG LỚP NÀY ---

    public async Task CreateUserAsync(User user)
    {
        await _usersCollection.InsertOneAsync(user);
    }

    public async Task<List<Stage>> GetStagesAsync() =>
        await _stagesCollection.Find(_ => true).SortBy(s => s.Order).ToListAsync();

    public async Task<List<Quiz>> GetQuizzesByStageIdAsync(string stageId) =>
        await _quizzesCollection.Find(q => q.StageId == stageId).ToListAsync();

    public async Task<User?> GetUserByEmailAsync(string email) =>
        await _usersCollection.Find(u => u.Email == email).FirstOrDefaultAsync();

    public async Task UpdateUserXpAsync(string userId, int xpEarned)
    {
        if (!ObjectId.TryParse(userId, out _))
        {
            return;
        }
        var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
        var update = Builders<User>.Update.Inc(u => u.Xp, xpEarned);
        await _usersCollection.UpdateOneAsync(filter, update);
    }

    public async Task CreateStageAsync(Stage stage)
    {
        await _stagesCollection.InsertOneAsync(stage);
    }

    public async Task CreateQuizAsync(Quiz quiz)
    {
        await _quizzesCollection.InsertOneAsync(quiz);
    }
} // <-- Dấu ngoặc nhọn kết thúc của lớp