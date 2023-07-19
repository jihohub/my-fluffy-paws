const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const session = require("express-session");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file) => {
  const uploadParams = {
    Bucket: "jiho-image-storage",
    Key: file.originalname, // 업로드될 파일 이름
    Body: fs.createReadStream(file.path), // 업로드할 파일 데이터
  };

  const command = new PutObjectCommand(uploadParams);
  const response = await s3Client.send(command);
  return response;
};

const deleteTempFile = (file) => {
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error("Error deleting temp file:", err);
    }
  });
};

// 모든 게시물 가져오기
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["userName", "userImage"],
            },
          ],
        },
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
          include: [
            {
              model: User,
              attributes: ["userName", "userImage"],
            },
          ],
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

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 게시물 작성
const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const image = req.file;

    let uploadedImage = "";

    if (image) {
      // 파일을 AWS S3에 업로드
      const uploadedFile = await uploadFile(image); // 파일을 AWS S3에 업로드

      // 업로드된 파일 경로를 image 변수에 할당
      uploadedImage = `https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/${image.originalname}`;
      deleteTempFile(image);
    }

    const newPost = await Post.create({
      userId: req.session.userId,
      image: uploadedImage,
      text,
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
    const { text } = req.body;

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
    }

    post.update({ text });

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

    await Comment.destroy({ where: { postId } });
    await post.destroy();

    res.status(200).json({ message: "게시물 삭제가 완료되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
