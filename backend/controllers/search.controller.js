const { Op } = require("sequelize");
const {
  User,
  Post,
  Comment,
  PostLike,
  CommentLike,
  Follower,
} = require("../models/model");

// 유저 또는 게시물 검색
const searchUsersAndPosts = async (req, res) => {
  try {
    const { keyword } = req.query;

    const users = await User.findAll({
      where: {
        userName: {
          [Op.like]: `%${keyword}%`,
        },
      },
      attributes: ["userId", "userName", "userImage"],
      include: [
        {
          model: Post,
          as: "posts",
          include: [
            {
              model: Comment,
              as: "comments",
            },
          ],
        },
        {
          model: Follower,
          as: "followers",
          attributes: ["followerId"],
          include: [
            {
              model: User,
              as: "follower",
              attributes: ["userId", "userName", "userImage"],
            },
          ],
        },
        {
          model: Follower,
          as: "followings",
          attributes: ["followingId"],
          include: [
            {
              model: User,
              as: "following",
              attributes: ["userId", "userName", "userImage"],
            },
          ],
        },
      ],
    });

    const posts = await Post.findAll({
      where: {
        text: {
          [Op.like]: `%${keyword}%`,
        },
      },
      include: [
        {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              attributes: ["userId", "userName", "userImage"],
            },
            {
              model: CommentLike,
              as: "likedUser",
              attributes: ["userId"],
              include: [
                {
                  model: User,
                  attributes: ["userId", "userName", "userImage"],
                },
              ],
            },
          ],
        },
        {
          model: User,
          attributes: ["userId", "userName", "userImage"],
        },
        {
          model: PostLike,
          attributes: ["userId"],
          as: "likedUser",
          include: [
            {
              model: User,
              attributes: ["userId", "userName", "userImage"],
            },
          ],
        },
      ],
    });

    res.status(200).json({ users, posts });
  } catch (error) {
    res.status(500).json({ error: "검색 중 오류 발생" });
  }
};

module.exports = {
  searchUsersAndPosts,
};
