const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/authMiddleware");
const likeController = require("../../controllers/like.controller");

// 게시물 좋아요
router.post("/post/:postId", verifyToken, likeController.likePost);

// 게시물 좋아요 취소
router.delete("/post/:postId", verifyToken, likeController.unlikePost);

// 댓글 좋아요
router.post("/comment/:commentId", verifyToken, likeController.likeComment);

// 댓글 좋아요 취소
router.delete("/comment/:commentId", verifyToken, likeController.unlikeComment);

module.exports = router;
