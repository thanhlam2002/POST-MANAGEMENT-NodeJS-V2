const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Xử lý API POST /register
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra username đã tồn tại chưa
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: 'Register successful!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Xử lý API POST /login
exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Invalid Credentials');  // Không tìm thấy user

    // So sánh mật khẩu nhập vào với mật khẩu đã hash
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid Credentials');  // Sai mật khẩu

    // Tạo JWT token và trả về cho client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
};
