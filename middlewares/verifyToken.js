const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).send('Access Denied');

    const token = authHeader.split(' ')[1];  // Lấy phần sau 'Bearer '

    if (!token) return res.status(401).send('No token provided');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;  // Gắn dữ liệu user vào request
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};
