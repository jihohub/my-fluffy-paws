const { Op, Sequelize } = require("sequelize");
const initializeSocketIO = require("../socket");
const { User, Post, Comment, Follower, ChatRoom, ChatMessage, ChatUser } = require("../models/model");

// 특정 userId로 채팅방 목록을 가져오는 기능
const getChatRoomsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const chatRooms = await ChatRoom.findAll({
      include: [
        {
          model: User,
          through: { where: { userId: userId } },
          as: "Users",
          attributes: ["userId", "userName", "userImage"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ error: "채팅방 목록을 가져오는 중 에러 발생" });
  };
};

// 특정 roomId로 채팅 메시지 목록을 가져오는 기능
const getChatMessagesByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;
    const chatMessages = await ChatMessage.findAll({
      where: {
        roomId: roomId,
      },
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["userId", "userName", "userImage"],
        },
        {
          model: User,
          as: "receiver",
          attributes: ["userId", "userName", "userImage"],
        },
      ],
    });

    res.status(200).json(chatMessages);
  } catch (error) {
    res.status(500).json({ error: "채팅 메시지를 가져오는 중 에러 발생" });
  }
};

// 새로운 채팅방을 생성하고 참가자를 추가하는 기능
const createChatRoom = async (req, res) => {
  try {
    // 이미 두 사용자 간에 채팅방이 있는지 확인합니다
    const { userId, partnerId } = req.body;
    const existingRoom = await ChatUser.findAll({
      attributes: ["roomId"],
      where: {
        userId: { [Op.in]: [userId, partnerId] },
      },
      group: ["roomId"],
      having: Sequelize.literal(`COUNT(DISTINCT userId) = 2`),
    });

    if (existingRoom.length > 0) {
      const roomId = existingRoom[0].roomId;
      const chatRoom = await ChatRoom.findOne({
        where: {
          roomId: roomId,
        },
        include: [
          {
            model: User,
            as: "Users",
            attributes: ["userId", "userName", "userImage"],
          },
        ],
      });
      res.status(200).json(chatRoom);
    } else {
      // 새로운 채팅방을 생성합니다
      const newRoom = await ChatRoom.create({});
      const roomId = newRoom.roomId;

      // 채팅방에 참가자를 추가합니다
      await ChatUser.bulkCreate([
        { roomId: roomId, userId: userId },
        { roomId: roomId, userId: partnerId },
      ]);

      const chatRoom = await ChatRoom.findOne({
        where: {
          roomId: roomId,
        },
        include: [
          {
            model: User,
            as: "Users",
            attributes: ["userId", "userName", "userImage"],
          },
        ],
      });

      res.status(200).json(chatRoom);
    }
  } catch (error) {
    res.status(500).json({ error: "채팅방을 생성하는 중 에러 발생" });
  }
};

// 특정 채팅방에 채팅 메시지를 보내는 기능
const sendChatMessageToServer = async (req, res) => {
  try {
    // 채팅 메시지를 데이터베이스에 저장합니다
    const { roomId } = req.params;
    const { userId, senderId, receiverId, text } = req.body;
    let newMessage = req.body;

    if (userId === senderId) {
      newMessage = await ChatMessage.create({
        roomId: roomId,
        senderId: senderId,
        receiverId: receiverId,
        text: text,
        sentAt: new Date(),
      });
    }

    res
      .status(200)
      .json({ message: "메시지 발송이 완료되었습니다.", newMessage });
  } catch (error) {
    res.status(500).json({ error: " 메시지를 보내는 중 에러 발생" });
  }
};

module.exports = {
  getChatRoomsByUserId,
  getChatMessagesByRoomId,
  createChatRoom,
  sendChatMessageToServer,
};
