const Comment = require("../models/comment.model");

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { userName, userProfile, content, createdAt, postId } = req.body;

    // Create the comment
    const comment = await Comment.create({
      userName,
      userProfile,
      content,
      createdAt,
      postId,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update an existing comment
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    // Find the comment by ID
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Update the comment
    comment.content = content;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Find the comment by ID
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Delete the comment
    await comment.destroy();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all comments for a post
const getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find all comments for the specified post ID
    const comments = await Comment.findAll({ where: { postId } });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
};
