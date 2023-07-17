import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useParams, useNavigate } from "react-router-dom";
import { getUserInfo, logout } from "../../store/reducers/userSlice";
import { RootState } from "../../store/store";
import Styled from "./index.styles";
import PostGrid from "../../Components/PostGrid";
import Button from "../../Components/Button";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userId } = useParams<{ userId: string }>();
  const myUserId = useSelector((state: RootState) => state.user.user?.userId);
  const otherUser = useSelector((state: RootState) => state.user.otherUser);

  const handleLogoutClick = async () => {
    await dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    console.log("otherUser", otherUser);
  }, [dispatch, otherUser]);

  useEffect(() => {
    console.log("otherUser", otherUser);
    // 사용자 정보와 사용자가 작성한 포스트 정보를 가져오는 액션 호출
    if (userId !== undefined) {
      dispatch(getUserInfo(parseInt(userId)));
    }
  }, [userId]);

  return (
    <Styled.UserProfileContainer>
      {otherUser ? (
        <>
          <Styled.UserImage src={otherUser.userImage} alt="Profile" />
          <Styled.UserName>{otherUser.userName}</Styled.UserName>
          {myUserId === otherUser.userId && (
            <Button
              color={"#8D7B68"}
              text="로그아웃"
              onClick={handleLogoutClick}
            />
          )}
          <Styled.PostsContainer>
            <PostGrid posts={otherUser?.posts} />
          </Styled.PostsContainer>
        </>
      ) : (
        <></>
      )}
    </Styled.UserProfileContainer>
  );
};

export default User;
