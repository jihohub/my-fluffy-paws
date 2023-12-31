const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const userRouter = require("./routes/api/user");
const postRouter = require("./routes/api/post");
const commentRouter = require("./routes/api/comment");
const tokenRouter = require("./routes/api/token");
const likeRouter = require("./routes/api/like");
const followRouter = require("./routes/api/follow");
const searchRouter = require("./routes/api/search");
const chatRouter = require("./routes/api/chat");

const app = express();

// Middleware
app.use(
  session({
    secret: process.env.JWT_SECRET, // 세션 식별을 위한 비밀 키
    resave: false, // 세션 변경 사항이 없어도 항상 저장
    saveUninitialized: true, // 초기화되지 않은 세션도 저장
    cookie: {
      secure: false, // HTTPS를 통해서만 쿠키 전송 (배포 시에는 true로 설정해야 함)
      maxAge: 1000 * 60 * 60 * 24, // 쿠키의 유효 기간 (여기서는 1일로 설정)
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://myfluffypaws.uk"
}));
app.use(express.static("./public"));

const httpServer = http.createServer(app);
const initializeSocketIO = require("./socket");
const io = initializeSocketIO(httpServer);

httpServer.listen(5000, () => console.log(`App listening on port 5000!`));

// Routes
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/token", tokenRouter);
app.use("/api/like", likeRouter);
app.use("/api/follow", followRouter);
app.use("/api/search", searchRouter);
app.use("/api/chat", chatRouter);

module.exports = app;
