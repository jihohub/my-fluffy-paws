const express = require("express");
const router = express.Router();
const tokenController = require("../../controllers/token.controller");

// 토큰 발급
router.post("/issue", tokenController.issueToken);

// 토큰 갱신
router.post("/refresh", tokenController.refreshToken);

module.exports = router;
