import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import socketIOClient, { Socket } from "socket.io-client";
import { selectUser } from "../../store/reducers/userSlice";
import {
  sendChatMessage,
  fetchChatMessages,
  selectChatRoomById,
  selectChatMessagesByRoomId,
} from "../../store/reducers/chatSlice";
import Styled from "./index.styles";
import ChatBubble from "../../Components/Chat/ChatBubble";
import { BsSendFill } from "react-icons/bs";

const ChatRoom: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { roomId } = useParams<{ roomId?: string }>();
  const roomIdAsInt = parseInt(roomId ?? "-1");
  const user = useSelector(selectUser);
  const room = useSelector(selectChatRoomById(roomIdAsInt));
  const messages = useSelector(selectChatMessagesByRoomId(roomIdAsInt));
  const partnerUser = room?.Users.filter(
    (eachUser) => eachUser.userId !== user?.userId
  )[0];
  
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    dispatch(fetchChatMessages(roomIdAsInt));
  }, []);

  const connectToServer = () => {
    const socket = socketIOClient("http://localhost:5000");
    setSocket(socket);
    socketRef.current = socket;

    if (roomIdAsInt) {
      socket.emit("joinRoom", roomIdAsInt);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 서버에 연결합니다.
  useEffect(() => {
    connectToServer();

    // 컴포넌트가 언마운트될 때 소켓 연결을 끊습니다.
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  // 메시지 입력과 전송을 처리하는 함수를 작성합니다.
  const [messageText, setMessageText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length <= 300) {
      setMessageText(newText);
    }
  };

  const handleSendMessage = async () => {
    if (messageText.trim() !== "" && user && partnerUser) {
      // 입력한 메시지를 서버로 보냅니다. (socketRef가 null인 경우에 대비하여 옵셔널 체이닝 사용)
      socketRef.current?.emit("sendMessage", dispatch(
        sendChatMessage({
          userId: user?.userId,
          roomId: roomIdAsInt,
          senderId: user?.userId,
          receiverId: partnerUser?.userId,
          text: messageText,
        })
      ));

      await dispatch(fetchChatMessages(roomIdAsInt));
      // 입력한 메시지를 리셋합니다.
      setMessageText("");
    }
  };

  useEffect(() => {
    if (!socketRef.current) return;

    // 클라이언트가 메시지를 받으면, 해당 메시지를 상태로 업데이트합니다.
    socketRef.current.on("receivedMessage", async (message) => {
      user && await dispatch(
        sendChatMessage({
          userId: user?.userId,
          roomId: message.roomId,
          senderId: message.senderId,
          receiverId: message.receiverId,
          text: message.text,
        }
      ));
      await dispatch(fetchChatMessages(roomIdAsInt));
    });
  }, [dispatch, roomIdAsInt]);

  return (
    <Styled.Wrapper>
      <Styled.UserCard key={partnerUser?.userId}>
        <Styled.UserDiv>
          <Styled.UserImage src={partnerUser?.userImage} alt="User Profile" />
          <Styled.UserName>{partnerUser?.userName}</Styled.UserName>
        </Styled.UserDiv>
      </Styled.UserCard>
      <Styled.BubbleContainer>
        {messages?.map((message) => (
          <>
            {user && message && (
              <ChatBubble
                chatBubbleProps={{ userId: user?.userId, message: message }}
              />
            )}
          </>
        ))}
      </Styled.BubbleContainer>
      <Styled.InputContainer>
        <Styled.MessageFormContainer>
          <Styled.MessageContainer>
            <Styled.Textarea
              value={messageText}
              onChange={handleInputChange}
              maxLength={300}
            />
            <Styled.CharCount>{messageText.length}/300</Styled.CharCount>
          </Styled.MessageContainer>
          <Styled.ButtonContainer>
            <Styled.Button color="#8D7B68" onClick={handleSendMessage}>
              <BsSendFill />
            </Styled.Button>
          </Styled.ButtonContainer>
        </Styled.MessageFormContainer>
      </Styled.InputContainer>
      <div ref={messageEndRef} />
    </Styled.Wrapper>
  );
};

export default ChatRoom;
