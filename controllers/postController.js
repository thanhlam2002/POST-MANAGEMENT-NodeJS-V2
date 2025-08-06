const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const thumbnailUrl = req.file.path;

        const post = new Post({
            title,
            content,
            category,
            thumbnail: thumbnailUrl,
            author: req.user.id,
        });

        await post.save();
        res.status(201).json({ message: 'Post created', post });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);

        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();
        res.json({ message: 'Post updated', post });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
