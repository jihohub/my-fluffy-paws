const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const jwt = require("jsonwebtoken");
const { Token } = require("../models/model");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "토큰이 필요합니다." });
  }

  try {
    // 토큰을 데이터베이스에서 조회
    const tokenData = await Token.findOne({ where: { accessToken: token } });
    if (!tokenData) {
      return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
    }

    // 액세스 토큰이 만료되었는지 확인
    if (new Date().getTime() > tokenData.accessTokenExpireAt) {
      // 리프레시 토큰을 확인하여 액세스 토큰 갱신
      const refreshToken = req.headers.refresh_token;

      if (!refreshToken) {
        return res
          .status(401)
          .json({
            error: "토큰이 만료되었습니다. 리프레시 토큰이 필요합니다.",
          });
      }

      // 리프레시 토큰을 데이터베이스에서 조회
      const refreshTokenData = await Token.findOne({ where: { refreshToken } });

      if (!refreshTokenData) {
        return res
          .status(401)
          .json({ error: "유효하지 않은 리프레시 토큰입니다." });
      }

      // 리프레시 토큰이 만료되었는지 확인
      if (
        new Date().getTime() > refreshTokenData.refreshTokenExpireAt
      ) {
        return res
          .status(401)
          .json({
            error: "리프레시 토큰이 만료되었습니다. 다시 로그인해주세요.",
          });
      }

      // 새로운 액세스 토큰 발급
      const newAccessToken = jwt.sign(
        { userId: refreshTokenData.userId },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h", // 액세스 토큰의 유효 기간 (1시간)
        }
      );

      // 새로운 액세스 토큰과 만료 기간을 데이터베이스에 저장
      await Token.update(
        {
          accessToken: newAccessToken,
          accessTokenExpireAt: new Date().getTime() + 3600 * 1000, // 1시간 후
        },
        {
          where: { refreshToken },
        }
      );

      // 새로운 액세스 토큰을 요청 헤더에 추가
      req.headers.authorization = `Bearer ${newAccessToken}`;
    }

    // 검증된 토큰의 정보를 요청 객체에 추가
    req.userId = tokenData.userId;
    next();
  } catch (error) {
    console.log(error);
    console.log(error);
    console.error(error);
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = verifyToken;
