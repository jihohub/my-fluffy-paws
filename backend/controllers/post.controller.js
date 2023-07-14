const { Sequelize } = require("sequelize");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

// 게시물 작성
const createPost = async (req, res) => {
  try {
    const { userId, image, content } = req.body;

    const newPost = await Post.create({
      userId,
      image,
      content,
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
      include: [
        {
          model: User,
          attributes: ["userName", "userImage"],
        },
      ],
    });

    const postsWithUser = posts.map((post) => {
      const {
        User: { userName, userImage },
        ...postAttributes
      } = post.toJSON();
      return {
        ...postAttributes,
        userName,
        userImage,
      };
    });


    res.status(200).json(postsWithUser);
  } catch (error) {
    console.error(error.stack); // 오류 스택 출력
    console.error(error); // 오류 스택 출력
    res.status(500).json({ error: error });
  }
};

// 하나의 게시물 가져오기
const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByPk(postId, {
      include: [
        {
          model: Comment,
        },
        {
          model: User,
          attributes: ["userName", "userImage"],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
    }

    const updatedPost = {
      ...post.toJSON(),
      userName: post.User.userName,
      userImage: post.User.userImage,
    };

    res.status(200).json(updatedPost);
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
