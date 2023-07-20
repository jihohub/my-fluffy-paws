const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/authMiddleware");
const postController = require("../../controllers/post.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// 게시물 작성
router.post("/", verifyToken, upload.single("image"), postController.createPost);

// 게시물 수정
router.put("/:postId", verifyToken, postController.updatePost);

// 게시물 삭제
router.delete("/:postId", verifyToken, postController.deletePost);

// 모든 게시물 가져오기
router.get("/", postController.getAllPosts);

// 하나의 게시물 가져오기
router.get("/:postId", postController.getPostById);

module.exports = router;
