
const { User, Post, Comment, CommentLike } = require("../models/model");

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
    res.status(500).json({ error: "댓글을 조회하는 중 에러 발생" });
  }
};

// 특정 게시물의 댓글 조회
const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.findAll({
      where: { postId },
      include: [
        {
          model: User,
          attributes: ["userId", "userName", "userImage"],
        },
        {
          model: CommentLike,
          as: "likedUser",
          attributes: ["userId"],
          include: [
            {
              model: User,
              attributes: ["userId", "userName", "userImage"],
            },
          ],
        },
      ],
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "댓글을 조회하는 중 에러 발생" });
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

    await Post.increment("commentCount", { where: { postId } });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "댓글을 작성하는 중 에러 발생" });
  }
};

// 댓글 삭제
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    await CommentLike.destroy({ where: { commentId } });

    const comment = await Comment.findByPk(commentId);
    const postId = comment.postId;

    await Post.decrement("commentCount", { where: { postId } });

    if (!comment) {
      return res.status(404).json({ error: "댓글을 찾을 수 없습니다." });
    }

    await comment.destroy();

    res.status(200).json({ message: "댓글 삭제가 완료되었습니다." });
  } catch (error) {
    res.status(500).json({ error: "댓글을 삭제하는 중 에러 발생" });
  }
};

module.exports = {
  getAllComments,
  getCommentsByPostId,
  createComment,
  deleteComment,
};
