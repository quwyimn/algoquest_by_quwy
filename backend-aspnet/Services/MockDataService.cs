using backend_aspnet.Models;

namespace backend_aspnet.Services
{
    public class MockDataService
    {
        public static List<Stage> GetMockStages()
        {
            return new List<Stage>
            {
                new Stage
                {
                    Id = "stage1",
                    Title = "Màn 1: Stack - Nền tảng Ngăn xếp",
                    Description = "Tìm hiểu về cấu trúc dữ liệu LIFO (Vào sau - Ra trước) và các thao tác cơ bản như Push, Pop, Peek.",
                    Order = 1,
                    Topic = "Stack",
                    Icon = "default_icon.png",
                    BackgroundImageUrl = "1.webp"
                },
                new Stage
                {
                    Id = "stage2",
                    Title = "Màn 2: Queue - Nghệ thuật Xếp hàng",
                    Description = "Khám phá nguyên tắc FIFO (Vào trước - Ra trước) và các ứng dụng của hàng đợi trong thực tế.",
                    Order = 2,
                    Topic = "Queue",
                    Icon = "default_icon.png",
                    BackgroundImageUrl = "2.webp"
                },
                new Stage
                {
                    Id = "stage3",
                    Title = "Màn 3: Linked List - Chuỗi Móc xích",
                    Description = "Nắm vững khái niệm về Node và con trỏ, hiểu rõ ưu nhược điểm của danh sách liên kết so với mảng.",
                    Order = 3,
                    Topic = "Linked List",
                    Icon = "default_icon.png",
                    BackgroundImageUrl = "3.jpg"
                }
            };
        }

        public static List<Quiz> GetMockQuizzes(string stageId)
        {
            return new List<Quiz>
            {
                new Quiz
                {
                    Id = $"{stageId}_quiz1",
                    Question = "Cấu trúc dữ liệu Stack hoạt động theo nguyên tắc nào?",
                    Options = new List<string> { "FIFO (First In First Out)", "LIFO (Last In First Out)", "Random Access", "Sequential Access" },
                    CorrectAnswer = 1,
                    StageId = stageId
                },
                new Quiz
                {
                    Id = $"{stageId}_quiz2",
                    Question = "Thao tác nào được sử dụng để thêm phần tử vào Stack?",
                    Options = new List<string> { "Pop", "Push", "Peek", "Dequeue" },
                    CorrectAnswer = 1,
                    StageId = stageId
                },
                new Quiz
                {
                    Id = $"{stageId}_quiz3",
                    Question = "Thao tác nào được sử dụng để lấy phần tử ra khỏi Stack?",
                    Options = new List<string> { "Push", "Pop", "Peek", "Enqueue" },
                    CorrectAnswer = 1,
                    StageId = stageId
                }
            };
        }

        public static List<User> GetMockUsers()
        {
            return new List<User>
            {
                new User
                {
                    Id = "user1",
                    Username = "testuser",
                    Email = "test@test.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("test123"),
                    Role = "User",
                    Xp = 0,
                    CompletedStages = new List<string>()
                },
                new User
                {
                    Id = "admin1",
                    Username = "admin",
                    Email = "admin@test.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    Role = "Admin",
                    Xp = 100,
                    CompletedStages = new List<string> { "stage1" }
                }
            };
        }
    }
}
