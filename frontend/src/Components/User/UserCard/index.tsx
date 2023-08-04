import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import {
  selectUser,
  getLoggedinUserInfo,
  getUserInfo,
} from "../../../store/reducers/userSlice";
import { Post } from "../../../store/reducers/postSlice";
import { followUser, unfollowUser } from "../../../store/reducers/followSlice";
import { selectAccessToken } from "../../../store/reducers/tokenSlice";
import { createNewChatRoom } from "../../../store/reducers/chatSlice";

export interface UserCardProps {
  user: {
    userId: number;
    email?: string;
    userName: string;
    userImage: string;
    posts?: Post[];
    followings?: {
      followingId: number;
      following: {
        userId: number;
        userName: string;
        userImage: string;
      };
    }[];
    followers?: {
      followerId: number;
      follower: {
        userId: number;
        userName: string;
        userImage: string;
      };
    }[];
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { userId, email, userName, userImage, posts, followings, followers } =
    user;
  const navigate = useNavigate();
  const { userId: profileUserId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const loggedinUser = useSelector(selectUser);
  const token = useSelector(selectAccessToken);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const handleUserClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    loggedinUser?.followings &&
      setIsFollowing(
        loggedinUser?.followings.some(
          (following) => following.following.userId === userId
        )
      );
  }, [user, loggedinUser]);

  const handleFollow = async () => {
    if (user && loggedinUser && userId) {
      // 현재 사용자가 이미 해당 사용자를 팔로우하고 있는지 확인합니다.
      if (isFollowing) {
        // 이미 팔로우 중인 경우 언팔로우를 실행합니다.
        await dispatch(unfollowUser({ followerId: userId, token }));
        await dispatch(getLoggedinUserInfo(loggedinUser.userId));
        if (profileUserId && parseInt(profileUserId) === loggedinUser.userId) {
          await dispatch(getUserInfo(loggedinUser.userId));
        }
        // 팔로우 또는 언팔로우 후 isFollowing 상태 업데이트
        setIsFollowing(false);
      } else {
        // 팔로우하지 않은 경우 팔로우를 실행합니다.
        await dispatch(followUser({ followerId: userId, token }));
        await dispatch(getLoggedinUserInfo(loggedinUser.userId));
        if (profileUserId && parseInt(profileUserId) === loggedinUser.userId) {
          await dispatch(getUserInfo(loggedinUser.userId));
        }
        // 팔로우 또는 언팔로우 후 isFollowing 상태 업데이트
        setIsFollowing(true);
      }
    }
  };

  const handleChatMessage = async () => {
    const response = (await dispatch(
      loggedinUser &&
        createNewChatRoom({
          userId: loggedinUser.userId,
          partnerId: userId,
        })
    )) as unknown;
    if (response && (response as AnyAction).payload) {
      const roomId = (response as AnyAction).payload.roomId;
      navigate(`/chat/${roomId}`);
    }
  };

  return (
    <Styled.UserCard key={userId}>
      <Styled.UserDiv onClick={() => handleUserClick(userId)}>
        <Styled.UserImage src={userImage} alt="User Profile" />
        <Styled.UserName>{userName}</Styled.UserName>
      </Styled.UserDiv>
      {loggedinUser && loggedinUser?.userId !== userId && (
        <Styled.ButtonsContainer>
          {!isFollowing ? (
            <Styled.FollowButton onClick={handleFollow}>
              팔로우
            </Styled.FollowButton>
          ) : (
            <Styled.FollowButton onClick={handleFollow}>
              언팔로우
            </Styled.FollowButton>
          )}
          <Styled.MessageButton onClick={handleChatMessage}>
            메시지
          </Styled.MessageButton>
        </Styled.ButtonsContainer>
      )}
    </Styled.UserCard>
  );
};

export default UserCard;
