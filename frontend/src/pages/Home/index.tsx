import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import {
  fetchPosts,
  selectPosts,
  selectIsLoading,
} from "../../store/reducers/postSlice";
import PostsContainer from "../../Components/Post/PostsContainer";
import Loading from "../../Components/Loading";

const Home = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Styled.MainContainer>
      {posts && <PostsContainer posts={posts} />}
    </Styled.MainContainer>
  );
};

export default Home;
