import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import {
  Post as PostData,
  fetchPosts,
  selectPosts,
  selectIsLoading,
  selectError,
} from "../../store/reducers/postSlice";
import PostsContainer from "../../Components/Post/PostsContainer";
import CommentsContainer from "../../Components/Comment/CommentsContainer";
import Modal from "../../Components/Modal";
import Loading from "../../Components/Loading";

const Home = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (!posts || posts.length === 0) {
    return <div></div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Styled.MainContainer>
      <PostsContainer posts={posts}></PostsContainer>
    </Styled.MainContainer>
  );
};

export default Home;
