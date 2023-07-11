const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/comment.controller");

// Create a new comment
router.post("/", commentController.createComment);

// Update an existing comment
router.put("/:commentId", commentController.updateComment);

// Delete a comment
router.delete("/:commentId", commentController.deleteComment);

// Get all comments for a post
router.get("/post/:postId", commentController.getAllComments);

module.exports = router;
