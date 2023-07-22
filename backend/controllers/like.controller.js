const { PostLike, CommentLike } = require("../models/model");

// 게시물 좋아요
const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.session.userId;

    // 게시물 좋아요 추가
    await PostLike.create({ userId, postId });

    res.status(200).json({ message: "게시물을 좋아요했습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

// 게시물 좋아요 취소
const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.session.userId;

    // 게시물 좋아요 삭제
    await PostLike.destroy({ where: { userId, postId } });

    res.status(200).json({ message: "게시물 좋아요를 취소했습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

// 댓글 좋아요
const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.session.userId;

    // 댓글 좋아요 추가
    await CommentLike.create({ userId, commentId });

    res.status(200).json({ message: "댓글을 좋아요했습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

// 댓글 좋아요 취소
const unlikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.session.userId;

    // 댓글 좋아요 삭제
    await CommentLike.destroy({ where: { userId, commentId } });

    res.status(200).json({ message: "댓글 좋아요를 취소했습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

module.exports = {
  likePost,
  unlikePost,
  likeComment,
  unlikeComment,
};
