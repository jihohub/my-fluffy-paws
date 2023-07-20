const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/authMiddleware");
const likeController = require("../../controllers/like.controller");

// 게시물 좋아요
router.post("/post/:postId", likeController.likePost);

// 게시물 좋아요 취소
router.delete("/post/:postId", likeController.unlikePost);

// 댓글 좋아요
router.post("/comment/:commentId", likeController.likeComment);

// 댓글 좋아요 취소
router.delete("/comment/:commentId", likeController.unlikeComment);

module.exports = router;
