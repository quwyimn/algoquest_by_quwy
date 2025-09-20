using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend_aspnet.Models;

[BsonIgnoreExtraElements] // THÊM DÒNG NÀY VÀO
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

    [BsonElement("backgroundImageUrl")]
    public string BackgroundImageUrl { get; set; } = null!;
}