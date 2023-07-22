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

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (post: PostData) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>게시물이 없습니다.</div>;
  }

  return (
    <Styled.MainContainer>
      <PostsContainer posts={posts}></PostsContainer>
    </Styled.MainContainer>
  );
};

export default Home;
