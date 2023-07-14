import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import { fetchPosts, selectPosts } from "../../store/reducers/postSlice";
import { RootState } from "../../store/store";
import PostContainer from "../../Components/PostContainer";
import CommentsContainer from "../../Components/CommentsContainer";

const Home = () => {
  const posts = useSelector(selectPosts);
  // const posts = useSelector((state: RootState) => state.post.posts);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchPosts()); // 액션 객체를 디스패치합니다..
    console.log(posts);
  }, []);

  return (
    <Styled.MainContainer>
      {posts?.map((post) => (
        <Link to={`/post/${post.postId}`} key={post.postId}>
          <Styled.PostContainer>
            <PostContainer post={post} />
            <CommentsContainer comments={post.Comments} />
          </Styled.PostContainer>
        </Link>
      ))}
    </Styled.MainContainer>
  );
};

export default Home;
