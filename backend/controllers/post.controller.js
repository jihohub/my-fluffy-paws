const Post = require("../models/post.model");

// Create a new post
const createPost = async (req, res) => {
  try {
    const { userName, userProfile, picture, content } = req.body;

    const newPost = await Post.create({
      userName,
      userProfile,
      picture,
      content,
      createdAt: new Date(),
    });

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update an existing post
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.content = content;
    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await post.destroy();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
};
