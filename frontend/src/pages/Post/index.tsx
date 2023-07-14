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
    <Styled.PostContainer>
      <Styled.AuthorContainer>
        <Styled.AuthorImage src={post.userImage} alt="User Image" />
        <Styled.AuthorName>{post.userName}</Styled.AuthorName>
      </Styled.AuthorContainer>
      <Styled.PostImage src={post.image} alt="Post" />
      <Styled.PostContent>{post.content}</Styled.PostContent>
      <h3>Comments:</h3>
      <CommentsContainer comments={post.Comments} />
    </Styled.PostContainer>
  );
};

export default Post;
