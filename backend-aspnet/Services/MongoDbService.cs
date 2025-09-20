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

    // --- CÁC HÀM TƯƠNG TÁC VỚI DATABASE ---

    public async Task<List<User>> GetAllUsersAsync() =>
        await _usersCollection.Find(_ => true).ToListAsync();

    public async Task<User?> GetUserByEmailAsync(string email) =>
        await _usersCollection.Find(u => u.Email == email).FirstOrDefaultAsync();

    public async Task CreateUserAsync(User user)
    {
        await _usersCollection.InsertOneAsync(user);
    }

    // HÀM CŨ "UpdateUserXpAsync" ĐÃ ĐƯỢC THAY THẾ BẰNG HÀM NÀY
    public async Task UpdateUserProgressAsync(string userId, int xpEarned, string completedStageId)
    {
        if (!ObjectId.TryParse(userId, out _) || !ObjectId.TryParse(completedStageId, out _))
        {
            return; // Bỏ qua nếu ID không hợp lệ
        }

        var filter = Builders<User>.Filter.Eq(u => u.Id, userId);

        // Tạo một lệnh cập nhật kết hợp
        var update = Builders<User>.Update
            .Inc(u => u.Xp, xpEarned) // Cộng vào điểm XP
            .AddToSet(u => u.CompletedStages, completedStageId); // Thêm stageId vào danh sách (nếu chưa có)

        await _usersCollection.UpdateOneAsync(filter, update);
    }

    public async Task<List<Stage>> GetStagesAsync() =>
        await _stagesCollection.Find(_ => true).SortBy(s => s.Order).ToListAsync();

    public async Task CreateStageAsync(Stage stage)
    {
        await _stagesCollection.InsertOneAsync(stage);
    }

    public async Task<List<Quiz>> GetQuizzesByStageIdAsync(string stageId) =>
        await _quizzesCollection.Find(q => q.StageId == stageId).ToListAsync();

    public async Task CreateQuizAsync(Quiz quiz)
    {
        await _quizzesCollection.InsertOneAsync(quiz);
    }
    public async Task<User?> GetUserByIdAsync(string userId)
    {
        if (!ObjectId.TryParse(userId, out _))
        {
            return null;
        }
        return await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
    }

    public async Task DeleteStageAsync(string id)
    {
        await _stagesCollection.DeleteOneAsync(s => s.Id == id);

        await _quizzesCollection.DeleteManyAsync(q => q.StageId == id);
    }


    public async Task DeleteQuizAsync(string id)
    {
        await _quizzesCollection.DeleteOneAsync(q => q.Id == id);
    }
    public async Task UpdateStageAsync(string id, Stage updatedStage)
    {
        await _stagesCollection.ReplaceOneAsync(s => s.Id == id, updatedStage);
    }
}