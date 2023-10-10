import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import socketIOClient, { Socket } from "socket.io-client";
import { selectUser } from "../../store/reducers/userSlice";
import {
  fetchChatRooms,
  selectChatRooms,
  selectIsLoading
} from "../../store/reducers/chatSlice";
import ChatCard from "../../Components/Chat/ChatCard";
import Loading from "../../Components/Loading";

const Chat: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const user = useSelector(selectUser);
  const rooms = useSelector(selectChatRooms);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    user && dispatch(fetchChatRooms(user?.userId));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {rooms.ids.map((roomId) => {
        const room = rooms.entities[roomId];
        const users = room?.Users || [];
        return (
          <div key={room?.roomId}>
            {room &&
              users &&
              users
                .filter((eachUser) => eachUser.userId !== user?.userId)
                .map((eachUser) => (
                  <ChatCard
                    chatCardProps={{ roomId: room?.roomId, user: eachUser }}
                    key={room?.roomId}
                  />
                ))}
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
