using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend_aspnet.Models;

[BsonIgnoreExtraElements]
public class Quiz
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("stageId")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string StageId { get; set; } = null!;

    [BsonElement("question")]
    public string Question { get; set; } = null!;

    [BsonElement("options")]
    public List<string> Options { get; set; } = null!;

    [BsonElement("correctAnswer")]
    public int CorrectAnswer { get; set; }

    [BsonElement("difficulty")]
    public string Difficulty { get; set; } = "Dễ";

    // ĐÃ SỬA LẠI Ở ĐÂY
    [BsonElement("bloomtag")]
    public string bloomtag { get; set; } = null!;
}