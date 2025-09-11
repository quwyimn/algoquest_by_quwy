using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend_aspnet.Models;

public class Quiz
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public string StageId { get; set; } = null!;

    public string Question { get; set; } = null!;
    public List<string> Options { get; set; } = null!;
    public int CorrectAnswer { get; set; }
    public string Difficulty { get; set; } = "Dễ";
}