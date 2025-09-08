const router = require('express').Router();
let Quiz = require('../models/quiz.model');

// API để tạo một câu đố mới cho một màn chơi
router.route('/add').post(async (req, res) => {
  try {
    const { stageId, question, options, correctAnswer, difficulty, bloomTag } = req.body;
    const newQuiz = new Quiz({ stageId, question, options, correctAnswer, difficulty, bloomTag });
    await newQuiz.save();
    res.status(201).json({ message: '✅ Tạo câu đố thành công!', quiz: newQuiz });
  } catch (err) {
    res.status(400).json('Lỗi: ' + err);
  }
});

// API để lấy tất cả câu đố của một màn chơi cụ thể
router.route('/:stageId').get(async (req, res) => {
  try {
    const quizzes = await Quiz.find({ stageId: req.params.stageId });
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(400).json('Lỗi: ' + err);
  }
});

module.exports = router;