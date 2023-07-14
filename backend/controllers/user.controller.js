const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file) => {
  console.log(file)
  const uploadParams = {
    Bucket: "jiho-image-storage",
    Key: file.filename, // 업로드될 파일 이름
    Body: file.data, // 업로드할 파일 데이터
  };

  const command = new PutObjectCommand(uploadParams);
  const response = await s3Client.send(command);
  return response;
};

// 회원가입
const signup = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const userImage = req.file;
    console.log(userImage);

    // 입력한 이메일로 이미 가입했는지 중복 검사
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "이미 가입된 이메일입니다." });
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
    let uploadedImage = "https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/avatar.png";

    // 파일이 업로드된 경우에만 S3에 업로드하고 파일 경로 저장
    if (userImage) {
      // 파일을 AWS S3에 업로드
      const uploadedFile = await uploadFile(userImage); // 파일을 AWS S3에 업로드
      const uploadedFilePath = uploadedFile.Location; // 업로드된 파일의 경로
      console.log(uploadedFile);
      // 업로드된 파일 경로를 userImage 변수에 할당
      uploadedImage = uploadedFilePath;
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
    console.error(error);
    res.status(500).json({ error: "Server error" });
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

    // JWT 토큰 생성
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 사용자 프로필 정보 가져오기
const getUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findByPk(userId, {
      attributes: ["userName", "userImage"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 사용자가 작성한 Post 목록 가져오기
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.user;

    const userPosts = await User.findByPk(userId, {
      include: [
        {
          model: Post,
        },
      ],
    });

    res.status(200).json(userPosts.Posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 사용자가 작성한 Comment 목록 가져오기
const getUserComments = async (req, res) => {
  try {
    const { userId } = req.user;

    const userComments = await User.findByPk(userId, {
      include: [
        {
          model: Comment,
        },
      ],
    });

    res.status(200).json(userComments.Comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  getUser,
  getUserPosts,
  getUserComments,
};
