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
import { Post as PostData } from "../../store/reducers/postSlice";
import { RootState } from "../../store/store";
import PostContainer from "../../Components/PostContainer";
import CommentsContainer from "../../Components/CommentsContainer";

const Post = () => {
  const { postId } = useParams() as { postId: string };
  const post = useSelector(selectPostById(parseInt(postId)));

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchPostById(parseInt(postId)));
    console.log(post?.Comments);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
        <CommentsContainer comments={post.Comments} />
      </Styled.PostContainer>
    </Styled.MainContainer>
  );
};

export default Post;
