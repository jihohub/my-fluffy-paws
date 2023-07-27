import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import { selectUser } from "../../../store/reducers/userSlice";
import { followUser, unfollowUser } from "../../../store/reducers/followSlice";
import { selectAccessToken } from "../../../store/reducers/tokenSlice";

export interface ChatCardProps {
  chatCardProps: {
    roomId: number;
    user: {
      userId: number;
      userName: string;
      userImage: string;
    };
  };
}

const ChatCard: React.FC<ChatCardProps> = ({ chatCardProps }) => {
  const { roomId, user } = chatCardProps;
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const loggedinUser = useSelector(selectUser);
  const token = useSelector(selectAccessToken);

  const handleChatClick = (roomId: number) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <Styled.UserCard key={user.userId}>
      <Styled.UserDiv onClick={() => handleChatClick(roomId)}>
        <Styled.UserImage src={user.userImage} alt="User Profile" />
        <Styled.UserName>{user.userName}</Styled.UserName>
      </Styled.UserDiv>
    </Styled.UserCard>
  );
};

export default ChatCard;
