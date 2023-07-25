const express = require("express");
const router = express.Router();
const searchController = require("../../controllers/search.controller");

// 유저, 게시물 검색 요청 처리
router.get("/", searchController.searchUsersAndPosts);

module.exports = router;
