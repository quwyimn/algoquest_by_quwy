// server.js

// 1. Import các thư viện cần thiết
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Để đọc được file .env

// 2. Khởi tạo ứng dụng express
const app = express();
const port = process.env.PORT || 5000;

// 3. Cấu hình các middleware
app.use(cors()); // Cho phép các request từ domain khác
app.use(express.json()); // Cho phép server đọc và gửi dữ liệu dạng JSON

// 4. Kết nối tới MongoDB
const uri = process.env.ATLAS_URI; // Lấy chuỗi kết nối từ file .env
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("✅ Kết nối tới database MongoDB thành công!");
})

// 5. Tạo một API route đơn giản để kiểm tra
app.get('/', (req, res) => {
  res.send('Chào mừng đến với AlgoQuest Backend!');
});

// --- Kết nối các API routes ---
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const stagesRouter = require('./routes/stages');
const quizzesRouter = require('./routes/quizzes');
app.use('/api/stages', stagesRouter);
app.use('/api/quizzes', quizzesRouter);

// 6. Lắng nghe các request trên một port cụ thể
app.listen(port, () => {
    console.log(`🚀 Server đang chạy trên port: ${port}`);
});