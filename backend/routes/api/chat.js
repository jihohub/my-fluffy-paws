const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/chat.controller");

// 특정 유저의 메시지 목록 가져오기
router.get("/user/:userId", chatController.getChatRoomsByUserId);

// 특정 메시지의 내역 가져오기
router.get("/room/:roomId", chatController.getChatMessagesByRoomId);

// 메시지 최초 생성
router.post("/create", chatController.createChatRoom);

// 메시지 전송
router.post("/send/:roomId", chatController.sendChatMessageToServer);

module.exports = router;
