const Post = require('../models/Post');

module.exports = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Kiểm tra quyền sở hữu
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You do not own this post' });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
