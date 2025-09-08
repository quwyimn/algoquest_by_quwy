const router = require('express').Router();
let Stage = require('../models/stage.model');

// API để tạo một màn chơi mới
router.route('/add').post(async (req, res) => {
  try {
    const { title, description, order, topic } = req.body;
    const newStage = new Stage({ title, description, order, topic });
    await newStage.save();
    res.status(201).json({ message: '✅ Tạo màn chơi thành công!', stage: newStage });
  } catch (err) {
    res.status(400).json('Lỗi: ' + err);
  }
});

// API để lấy tất cả các màn chơi (dùng cho map game)
router.route('/').get(async (req, res) => {
  try {
    const stages = await Stage.find().sort({ order: 1 }); // Sắp xếp theo thứ tự màn chơi
    res.status(200).json(stages);
  } catch (err) {
    res.status(400).json('Lỗi: ' + err);
  }
});

module.exports = router;