const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middlewares/verifyToken');
const verifyOwnership = require('../middlewares/verifyOwnership');
const upload = require('../middlewares/upload');

router.get('/', postController.getPosts);
router.post('/', verifyToken, upload.single('thumbnail'), postController.createPost);
router.put('/:id', verifyToken, verifyOwnership, postController.updatePost);
router.delete('/:id', verifyToken, verifyOwnership, postController.deletePost);

module.exports = router;
