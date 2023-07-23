const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/authMiddleware");
const followController = require("../../controllers/follow.controller");

// 유저를 팔로우하기
router.post("/:followerId", verifyToken, followController.followUser);

// 유저의 팔로우 취소하기
router.delete("/:followerId", verifyToken, followController.unfollowUser);

// 팔로워 목록 가져오기
router.get("/:userId/followers", followController.getFollowers);

// 팔로잉 목록 가져오기
router.get("/:userId/followings", followController.getFollowings);

module.exports = router;
