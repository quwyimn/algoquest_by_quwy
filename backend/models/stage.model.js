const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stageSchema = new Schema({
  title: { type: String, required: true, unique: true }, // Ví dụ: "Stack - Khái niệm cơ bản"
  description: { type: String, required: true },
  order: { type: Number, required: true, unique: true }, // Thứ tự của màn chơi trên bản đồ (1, 2, 3...)
  topic: { type: String, required: true }, // Chủ đề chính, ví dụ: "Stack", "Queue"
  icon: { type: String, default: 'default_icon.png' } // Tên file icon cho màn chơi (để dành cho frontend)
}, {
  timestamps: true,
});

const Stage = mongoose.model('Stage', stageSchema);
module.exports = Stage;