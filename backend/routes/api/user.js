const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// 회원가입
router.post("/signup", upload.single("userImage"), userController.signup);

// 로그인
router.post("/login", userController.login);

// 로그아웃
router.post("/logout", userController.logout);

// 사용자 프로필 정보 가져오기
router.get("/getinfo", userController.getUser);

// 사용자가 작성한 Post 목록 가져오기
router.get("/posts", userController.getUserPosts);

// 사용자가 작성한 Comment 목록 가져오기
router.get("/comments", userController.getUserComments);

module.exports = router;
