const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/authMiddleware");
const commentController = require("../../controllers/comment.controller");

// 전체 댓글 조회
router.get("/", commentController.getAllComments);

// 댓글 작성
router.post("/", commentController.createComment);

// 댓글 삭제
router.delete("/:commentId", verifyToken, commentController.deleteComment);

module.exports = router;
