const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/authMiddleware");
const commentController = require("../../controllers/comment.controller");

// 전체 댓글 조회
router.get("/", commentController.getAllComments);

// 특정 게시물의 댓글 조회
router.get("/:postId", commentController.getCommentsByPostId);

// 댓글 작성
router.post("/", verifyToken, commentController.createComment);

// 댓글 삭제
router.delete("/:commentId", verifyToken, commentController.deleteComment);

module.exports = router;
