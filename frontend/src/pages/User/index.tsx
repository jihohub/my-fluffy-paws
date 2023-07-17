import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { getUserInfo, getUserPosts } from "../../store/reducers/userSlice";
import { RootState } from "../../store/store";
import Styled from "./index.styles";

const User = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userId } = useParams<{ userId: string }>();
  const user = useSelector((state: RootState) => state.user.user);
  // const userPosts = useSelector((state: RootState) => state.user.userPosts);

  useEffect(() => {
    // 사용자 정보와 사용자가 작성한 포스트 정보를 가져오는 액션 호출
    // dispatch(getUserInfo(parseInt(userId)));
    // dispatch(getUserPosts(parseInt(userId)));
  }, [dispatch, userId]);

  if (!user) {
    // 사용자 정보가 없는 경우 로딩 등 처리
    return <div>Loading...</div>;
  }

  return (
    <Styled.UserProfileContainer>
      <Styled.UserImage src={user.userImage} alt="Profile" />
      <Styled.UserName>{user.userName}</Styled.UserName>

      <Styled.PostsContainer>
        {/* <h2>작성한 포스트 목록</h2>
        <ul>
          {userPosts.map((post) => (
            <li key={post.postId}>{post.title}</li>
          ))}
        </ul> */}
      </Styled.PostsContainer>
    </Styled.UserProfileContainer>
  );
};

export default User;
