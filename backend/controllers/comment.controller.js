const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

// 댓글 작성
const createComment = async (req, res) => {
  try {
    const { userName, userImage, content, postId, userId } = req.body;

    const comment = await Comment.create({
      userName,
      userImage,
      content,
      postId,
      userId,
    });

    const post = await Post.findByPk(postId);
    if (post) {
      const commentCount = await Comment.count({
        where: { postId: post.postId },
      });
      await post.update({ commentCount });
    }

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 댓글 수정
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "댓글을 찾을 수 없습니다." });
    }

    comment.update({ content });

    res.status(200).json(comment);
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
  createComment,
  updateComment,
  deleteComment,
};
