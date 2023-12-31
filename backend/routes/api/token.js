const express = require("express");
const router = express.Router();
const tokenController = require("../../controllers/token.controller");

// 토큰 발급
router.post("/issue", tokenController.issueAccessToken);

// 토큰 갱신
router.post("/refresh", tokenController.refreshAccessToken);

// 토큰 제거
router.delete("/remove", tokenController.removeAccessToken);

module.exports = router;
