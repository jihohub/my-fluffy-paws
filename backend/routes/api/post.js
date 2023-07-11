const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post.controller");

// 게시물 작성
router.post("/", postController.createPost);

// 게시물 수정
router.put("/:postId", postController.updatePost);

// 게시물 삭제
router.delete("/:postId", postController.deletePost);

// 모든 게시물 가져오기
router.get("/", postController.getAllPosts);

// 하나의 게시물 가져오기
router.get("/:postId", postController.getPostById);

module.exports = router;
