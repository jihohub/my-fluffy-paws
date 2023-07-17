const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "토큰이 필요합니다." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
    }

    req.userId = decoded.userId; // 검증된 토큰의 정보를 요청 객체에 추가
    next();
  });
};

module.exports = verifyToken;
