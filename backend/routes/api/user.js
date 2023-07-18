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
router.get("/:userId", userController.getUser);

// 닉네임 중복 검사
router.post("/checkname", userController.checkDuplicateUserName);

module.exports = router;
