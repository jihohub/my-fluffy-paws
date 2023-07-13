import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import { fetchPosts, selectPosts } from "../../store/reducers/postSlice";
import { RootState } from "../../store/store";

const Home = () => {
  // const posts = useSelector(selectPosts);
  const posts = useSelector((state: RootState) => state.post.posts);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchPosts()); // 액션 객체를 디스패치합니다..
  }, []);

  return (
    <Styled.MainContainer>
      {posts?.map((post) => (
        <Link to={`/post/${post.postId}`} key={post.postId}>
          <Styled.PostContainer>
            <Styled.UserContainer>
              <Styled.ProfileImage src={post.userProfile} alt="Profile" />
              <Styled.Username>{post.userName}</Styled.Username>
            </Styled.UserContainer>
            <Styled.PostImage src={post.picture} alt="Post" />
            <Styled.PostContent>{post.content}</Styled.PostContent>
            <Styled.CommentsContainer>{post.commentCount}</Styled.CommentsContainer>
          </Styled.PostContainer>
        </Link>
      ))}
    </Styled.MainContainer>
  );
};

export default Home;
