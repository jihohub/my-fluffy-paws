const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post.controller");

// Create a new post
router.post("/", postController.createPost);

// Update an existing post
router.put("/:postId", postController.updatePost);

// Delete a post
router.delete("/:postId", postController.deletePost);

// Get all posts
router.get("/", postController.getAllPosts);

// Get a single post by ID
router.get("/:postId", postController.getPostById);

module.exports = router;
