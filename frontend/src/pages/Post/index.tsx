import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  fetchPostById,
  selectPostById,
  selectIsLoading,
  selectError,
} from "../../store/reducers/postSlice";
import Styled from "./index.styles";
import PostContainer from "../../Components/PostContainer";
import { fetchComments } from "../../store/reducers/commentSlice";
import CommentsContainer from "../../Components/CommentsContainer";
import CommentForm from "../../Components/CommentForm";
import Loading from "../../Components/Loading";

const Post = () => {
  const { postId } = useParams() as { postId: string };
  const post = useSelector(selectPostById(parseInt(postId)));

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchPostById(parseInt(postId)));
    dispatch(fetchComments(parseInt(postId)));
  }, [dispatch, postId]);

  if (isLoading) {
    return <Loading />;
  }

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
        <CommentsContainer comments={post.comments} />
      </Styled.PostContainer>
      <CommentForm />
    </Styled.MainContainer>
  );
};

export default Post;
