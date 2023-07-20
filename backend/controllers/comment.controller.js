// const Comment = require("../models/comment.model");
// const User = require("../models/user.model")
// const Post = require("../models/post.model");
const { User, Post, Comment, Token } = require("../models/model");

// 전체 댓글 조회
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["userId", "userName", "userImage"],
        },
      ],
    });

    // comments 데이터와 함께 userId, userName, userImage가 포함된 결과를 반환
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// 댓글 작성
const createComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    const comment = await Comment.create({
      postId,
      userId: req.session.userId,
      text,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 댓글 삭제
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "댓글을 찾을 수 없습니다." });
    }

    await comment.destroy();

    res.status(200).json({ message: "댓글 삭제가 완료되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllComments,
  createComment,
  deleteComment,
};
