console.log('>>> ĐANG CHẠY FILE SERVER.JS NÀY <<<');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const logger = require('./middlewares/logger');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// 1. Middleware đọc JSON và form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Middleware Logger (In log mỗi request)
app.use(logger);

// 3. API ROUTES
app.use('/api', authRoutes);
app.use('/api/posts', postRoutes); 

// 3. Serve static files
app.use(express.static(path.join(__dirname, 'public')));


// 5. Catch-all (Phải đặt CUỐI CÙNG)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
