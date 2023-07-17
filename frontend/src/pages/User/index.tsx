import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../store/reducers/userSlice";
import { RootState } from "../../store/store";
import Styled from "./index.styles";
import PostGrid from "../../Components/PostGrid";

const User = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userId } = useParams<{ userId: string }>();
  const otherUser = useSelector((state: RootState) => state.user.otherUser);

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
          <Styled.PostsContainer>
            <PostGrid posts={otherUser?.posts} />
            {/* {otherUser?.posts?.map((post) => (
              <PostGrid post={post} />
            ))} */}
          </Styled.PostsContainer>
        </>
      ) : (
        <></>
      )}
    </Styled.UserProfileContainer>
  );
};

export default User;
