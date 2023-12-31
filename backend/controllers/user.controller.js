const { User, Post, Comment, Follower } = require("../models/model");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file) => {
  const uploadParams = {
    Bucket: "jiho-image-storage",
    Key: file.originalname, // 업로드될 파일 이름
    Body: fs.createReadStream(file.path), // 업로드할 파일 데이터
  };

  const command = new PutObjectCommand(uploadParams);
  const response = await s3Client.send(command);
  return response;
};

const deleteTempFile = (file) => {
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error("Error deleting temp file:", err);
    }
  });
};

// 회원가입
const signup = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const userImage = req.file;

    // 입력한 이메일로 이미 가입했는지 중복 검사
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "이미 가입된 이메일입니다." });
    }

    // 이메일 형식이 올바르지 않은 경우 에러 처리
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({ error: "올바른 이메일 형식이 아닙니다." });
    }

    // 닉네임 형식이 올바르지 않은 경우 에러 처리
    if (!/^[A-Za-z0-9]+$/.test(userName)) {
      return res
        .status(400)
        .json({ error: "닉네임은 영어와 숫자만 포함해야 합니다." });
    }

    // 비밀번호가 8자리 이상인지 확인
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "비밀번호는 최소 8자리 이상이어야 합니다." });
    }

    // 입력한 닉네임이 존재하는지 중복 검사
    const existingName = await User.findOne({ where: { userName } });
    if (existingName) {
      return res.status(400).json({ error: "이미 존재하는 닉네임입니다." });
    }

    // 프로필 사진을 입력하지 않았으면 기본 사진으로 지정
    let uploadedImage =
      "https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/avatar.png";

    // 파일이 업로드된 경우에만 S3에 업로드하고 파일 경로 저장
    if (userImage) {
      // 파일을 AWS S3에 업로드
      const uploadedFile = await uploadFile(userImage); // 파일을 AWS S3에 업로드

      // 업로드된 파일 경로를 userImage 변수에 할당
      uploadedImage = `https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/${userImage.originalname}`;
      deleteTempFile(userImage);
    }

    // 비밀번호를 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 유저 생성
    const newUser = await User.create({
      email,
      password: hashedPassword,
      userName,
      userImage: uploadedImage,
    });

    res.status(201).json({ message: "가입이 완료되었습니다." });
  } catch (error) {
    res.status(500).json({ error: "회원가입 중 오류 발생" });
  }
};

// 로그인
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // email로 유저 찾기
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "잘못된 이메일입니다." });
    }

    // 비밀번호 비교
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "잘못된 비밀번호입니다." });
    }

    req.session.userId = user.userId;

    const userFullInfo = await User.findByPk(user.userId, {
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

    res.status(200).json({ user: userFullInfo });
  } catch (error) {
    res.status(500).json({ error: "로그인 중 오류 발생" });
  }
};

// 로그아웃
const logout = async (req, res) => {
  try {
    delete req.session.userId;
    res.status(200).json({ message: "로그아웃이 완료되었습니다." });
  } catch (error) {
    res.status(500).json({ error: "로그아웃 중 오류 발생" });
  }
};

// 사용자 프로필 정보 가져오기
const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
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

    if (!user) {
      return res.status(404).json({ error: "유저정보를 찾을 수 없습니다." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "유저정보 조회 중 오류 발생" });
  }
};

// 여러 사용자 정보를 한 번에 가져오기
const getUsersBatch = async (req, res) => {
  try {
    const { userIds } = req.body;

    // 여러 사용자 ID를 입력받아 해당 사용자들의 정보를 한 번에 가져옵니다.
    const users = await User.findAll({
      where: {
        userId: userIds,
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

    if (!users) {
      return res.status(404).json({ error: "유저정보를 찾을 수 없습니다." });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "유저정보 조회 중 오류 발생" });
  }
};

// 회원가입 시 닉네임 중복 여부를 확인하기
const checkDuplicateUserName = async (req, res) => {
  try {
    const { userName } = req.body;

    // 입력한 닉네임이 존재하는지 중복 검사
    const existingName = await User.findOne({ where: { userName } });
    if (existingName) {
      return res.status(400).json({ error: "이미 존재하는 닉네임입니다." });
    }

    // 존재하지 않으면 중복되지 않은 닉네임으로 판단
    res.status(200).json({ message: "사용 가능한 닉네임입니다." });
  } catch (error) {
    res.status(500).json({ error: "중복 닉네임 체크 중 오류 발생" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getUser,
  getUsersBatch,
  checkDuplicateUserName,
};
