using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend_aspnet.Models;

public class Stage
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int Order { get; set; }
    public string Topic { get; set; } = null!;
}