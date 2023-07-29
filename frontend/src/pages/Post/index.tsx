import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  fetchPostById,
  selectPostById,
  selectError,
} from "../../store/reducers/postSlice";
import Styled from "./index.styles";
import PostContainer from "../../Components/Post/PostContainer";
import { fetchCommentsByPostId } from "../../store/reducers/commentSlice";

const Post = () => {
  const { postId } = useParams() as { postId: string };
  const post = useSelector(selectPostById(parseInt(postId)));

  const error = useSelector(selectError);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchPostById(parseInt(postId)));
    dispatch(fetchCommentsByPostId(parseInt(postId)));
  }, [dispatch, postId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Styled.MainContainer>
      <Styled.PostContainer>
        <PostContainer post={post}></PostContainer>
      </Styled.PostContainer>
    </Styled.MainContainer>
  );
};

export default Post;
