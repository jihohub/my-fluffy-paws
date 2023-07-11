const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/comment.controller");

// 댓글 작성
router.post("/", commentController.createComment);

// 댓글 수정
router.put("/:commentId", commentController.updateComment);

// 댓글 삭제
router.delete("/:commentId", commentController.deleteComment);

module.exports = router;
