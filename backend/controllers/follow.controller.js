const { User, Follower } = require("../models/model");

// 유저를 팔로우하기
const followUser = async (req, res) => {
  try {
    const { followingId } = req.params;
    const followerId = req.session.userId;

    const follower = await Follower.create({
      followerId,
      followingId,
    });

    res.status(201).json({ message: "유저를 팔로우했습니다.", follower });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

// 유저의 팔로우 취소하기
const unfollowUser = async (req, res) => {
  try {
    const { followingId } = req.params;
    const followerId = req.session.userId;

    await Follower.destroy({
      where: {
        followerId,
        followingId,
      },
    });

    res.status(200).json({ message: "유저의 팔로우를 취소했습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

// 팔로워 목록 가져오기
const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const followers = await Follower.findAll({
      where: {
        followingId: userId,
      },
      include: [
        {
          model: User,
          attributes: ["userId", "userName", "userImage"],
          as: "follower",
        },
      ],
    });

    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

// 팔로잉 목록 가져오기
const getFollowings = async (req, res) => {
  try {
    const { userId } = req.params;

    const followings = await Follower.findAll({
      where: {
        followerId: userId,
      },
      include: [
        {
          model: User,
          attributes: ["userId", "userName", "userImage"],
          as: "following",
        },
      ],
    });

    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
};
