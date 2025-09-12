using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend_aspnet.Models;


[BsonIgnoreExtraElements] 

public class Stage
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; } = null!;

    [BsonElement("description")]
    public string Description { get; set; } = null!;

    [BsonElement("order")]
    public int Order { get; set; }

    [BsonElement("topic")]
    public string Topic { get; set; } = null!;

    [BsonElement("icon")]
    public string Icon { get; set; } = null!;

    // THÊM 2 THUỘC TÍNH NÀY VÀO
    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; }

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; }
}