import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import { selectUser } from "../../../store/reducers/userSlice";
import { followUser, unfollowUser } from "../../../store/reducers/followSlice";
import { selectAccessToken } from "../../../store/reducers/tokenSlice";
import { User } from "../../../store/reducers/userSlice";
import moment from "moment";
import "moment/locale/ko";

export interface ChatBubbleProps {
  chatBubbleProps: {
    userId: number;
    message: {
      messageId: number;
      roomId: number;
      text: string;
      senderId: number;
      receiverId: number;
      sentAt: Date;
      sender: User;
      receiver: User;
    };
  };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ chatBubbleProps }) => {
  const { userId, message } = chatBubbleProps;

  return (
    <Styled.BubbleContainer key={message.messageId}>
      <Styled.BubbleDiv isOwnMessage={userId === message.senderId}>
        <Styled.BubbleText>{message.text}</Styled.BubbleText>
        <Styled.BubbleText>
          {moment(message.sentAt).format('YYYY년 MMMM Do a h:mm:ss')}
        </Styled.BubbleText>
      </Styled.BubbleDiv>
    </Styled.BubbleContainer>
  );
};

export default ChatBubble;
