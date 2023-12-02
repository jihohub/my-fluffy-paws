const { Server } = require("socket.io");

const connectedClients = [];

const initializeSocketIO = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://myfluffypaws.uk",
    },
  });

  io.on("connection", (socket) => {
    console.log("웹소켓 연결이 열렸습니다.");

    // 클라이언트가 접속하면 소켓을 배열에 추가
    connectedClients[socket.id] = { socket: socket, roomId: null };

    // 클라이언트가 방에 접속할 때
    socket.on("joinRoom", (roomId) => {
      // 기존에 접속한 방이 있다면 먼저 떠납니다.
      if (connectedClients[socket.id].roomId) {
        socket.leave(connectedClients[socket.id].roomId);
      }

      // 새로운 방에 접속합니다.
      socket.join(roomId);
      connectedClients[socket.id].roomId = roomId;
    });

    // 클라이언트가 메시지를 보내면 다른 클라이언트들에게 메시지를 브로드캐스팅
    socket.on("sendMessage", async (message) => {
      console.log("클라이언트로부터 받은 메시지:", message.text);

      // 클라이언트가 속한 방에만 메시지를 브로드캐스팅합니다.
      socket
        .to(connectedClients[socket.id].roomId)
        .emit("receivedMessage", message);
    });

    // 클라이언트가 접속을 끊으면 소켓을 배열에서 제거
    socket.on("disconnect", () => {
      console.log("웹소켓 연결이 닫혔습니다.");
      delete connectedClients[socket.id];
    });
  });

  return io;
};

module.exports = initializeSocketIO;
