const { User, Token } = require("../models/model");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 토큰 발급
const issueAccessToken = async (req, res) => {
  try {
    const { email, password } = req.body;

    // email로 유저 찾기
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "잘못된 이메일입니다." });
    }

    // 비밀번호 비교
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "잘못된 비밀번호입니다." });
    }

    // 검증이 완료된 사용자의 userId 값을 얻어옴
    const userId = user.userId;

    // 액세스 토큰 발급
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h", // 액세스 토큰의 유효 기간 (1시간)
    });

    // 리프레시 토큰 발급
    const refreshToken = uuidv4();

    // 발급된 토큰 정보를 데이터베이스에 저장
    await Token.create({
      userId,
      accessToken,
      refreshToken,
      accessTokenExpireAt: new Date().getTime() + 3600 * 1000, // 1시간 후
      refreshTokenExpireAt: new Date().getTime() + 7 * 24 * 3600 * 1000, // 7일 후
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 토큰 갱신
const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // 리프레시 토큰이 유효한지 검사
    const token = await Token.findOne({ where: { refreshToken } });
    if (!token) {
      return res
        .status(401)
        .json({ error: "유효하지 않은 리프레시 토큰입니다." });
    }

    // 리프레시 토큰이 만료되었는지 검사
    if (new Date().getTime() > token.refreshTokenExpireAt.getTime()) {
      return res.status(401).json({ error: "만료된 리프레시 토큰입니다." });
    }

    // 리프레시 토큰이 유효하고 만료되지 않은 경우, 해당 토큰의 사용자 정보에서 userId를 얻어옴
    const userId = token.userId;

    // 새로운 액세스 토큰 발급
    const newAccessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h", // 새로운 액세스 토큰의 유효 기간 (1시간)
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 토큰 제거
const removeAccessToken = async (req, res) => {
  try {
    const { userId } = req.user; // 미들웨어에서 저장한 인증된 사용자의 userId 정보를 가져옴

    // 해당 사용자의 토큰 정보를 데이터베이스에서 삭제
    await Token.destroy({ where: { userId } });

    res.status(200).json({ message: "토큰이 성공적으로 제거되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  issueAccessToken,
  refreshAccessToken,
  removeAccessToken,
};
