const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  // Liên kết câu đố này với một màn chơi cụ thể
  stageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stage', required: true },
  
  question: { type: String, required: true }, // Nội dung câu hỏi
  options: { type: [String], required: true }, // Mảng các lựa chọn, ví dụ: ["A", "B", "C", "D"]
  correctAnswer: { type: Number, required: true }, // Vị trí của đáp án đúng trong mảng options (0, 1, 2, hoặc 3)
  
  difficulty: { 
    type: String, 
    enum: ['Dễ', 'Trung bình', 'Khó'], // Chỉ cho phép 3 giá trị này
    default: 'Dễ' 
  },
  bloomTag: { type: String, default: 'Nhớ' } // Gán nhãn Bloom
}, {
  timestamps: true,
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;