const { Sequelize } = require("sequelize");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

// 게시물 작성
const createPost = async (req, res) => {
  try {
    const { userName, userImage, image, content, userId } = req.body;

    const newPost = await Post.create({
      userName,
      userImage,
      image,
      content,
      userId,
    });

    res
      .status(201)
      .json({ message: "게시물 작성이 완료되었습니다.", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 게시물 수정
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
    }

    post.update({ content });

    res.status(200).json({ message: "게시물 수정이 완료되었습니다.", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 게시물 삭제
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
    }

    await post.destroy();

    res.status(200).json({ message: "게시물 삭제가 완료되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 모든 게시물 가져오기
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: Comment,
      },
    });

    const postsWithCommentCount = posts.map((post) => {
      return {
        ...post.toJSON(),
        commentCount: post.Comments.length,
      };
    });

    res.status(200).json(postsWithCommentCount);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// 하나의 게시물 가져오기
const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByPk(postId, {
      include: {
        model: Comment,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
    }

    res.status(200).json(post);
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
