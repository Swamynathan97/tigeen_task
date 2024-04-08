const express = require('express');
const { authenticateUser } = require('../middleware/authMiddleware');
const {
  getAllPosts,
  getPostById,
  addComment,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const router = express.Router();

router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', authenticateUser, createPost);
router.post('/comment/:id',authenticateUser, addComment);
router.put('/posts/:id', authenticateUser, updatePost);
router.delete('/posts/:id', authenticateUser, deletePost);

module.exports = router;
