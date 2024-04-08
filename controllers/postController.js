const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = new Post({
      title,
      content,
      author: req.user.userId,
      tags,
    });
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const comment = new Comment({
      content,
      author: req.user.userId,
      post: post._id,
    });
    await comment.save();
    post.comments.push(comment._id);
    await post.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized to update this post' });
    }
    post.title = title;
    post.content = content;
    await post.save();
    res.json({ message: 'Post updated successfully' , post});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.deletePost = async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findOneAndDelete({ _id: postId, author: req.user.userId });
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully', post });
    } catch (err) {
      console.error('Error deleting post:', err);
      res.status(500).json({ error: err.message });
    }
  };