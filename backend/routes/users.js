const router = require('express').Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user.model');

// --- API Endpoint để Đăng ký User mới (PHIÊN BẢN ĐÚNG) ---
router.route('/register').post(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kiểm tra xem email hoặc username đã tồn tại chưa
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email hoặc Username đã tồn tại.' });
    }

    // Mã hóa mật khẩu trước khi lưu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Lưu mật khẩu đã được mã hóa
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: '✅ Đăng ký người dùng thành công!', user: savedUser });

  } catch (err) {
    res.status(500).json({ message: '❌ Lỗi server: ' + err.message });
  }
});


// --- API Endpoint để Đăng nhập ---
router.route('/login').post(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng bằng email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng!' });
    }

    // So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng!' });
    }

    // Nếu mọi thứ đều đúng
    res.status(200).json({
      message: '✅ Đăng nhập thành công!',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: '❌ Lỗi server: ' + err.message });
  }
});


module.exports = router;