// backend/models/user.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Xóa khoảng trắng ở đầu và cuối
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  xp: {
    type: Number,
    default: 0 // Mặc định là 0 khi tạo user mới
  },
  level: {
    type: Number,
    default: 1
  },
  badges: {
    type: [String], // Một mảng các chuỗi, ví dụ: ["newbie", "stack_master"]
    default: []
  }
}, {
  timestamps: true, // Tự động thêm 2 trường: createdAt và updatedAt
});

const User = mongoose.model('User', userSchema);

module.exports = User;