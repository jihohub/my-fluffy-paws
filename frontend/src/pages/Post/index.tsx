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

const Post = () => {
  const { postId } = useParams() as { postId: string };
  const post = useSelector(selectPostById(parseInt(postId)));

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchPostById(parseInt(postId)));
  }, [dispatch, postId]);

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
      <Styled.PostTitle>{post.content}</Styled.PostTitle>
      <Styled.PostAuthor>Posted by: {post.userName}</Styled.PostAuthor>
      <Styled.PostImage src={post.image} alt="Post" />
      <h3>Comments:</h3>
      <Styled.CommentList>
        {post.Comments.length > 0 ? (
          post.Comments.map((comment) => (
            <Styled.CommentItem key={comment.commentId}>
              {comment.content}
            </Styled.CommentItem>
          ))
        ) : (
          <p>No comments</p>
        )}
      </Styled.CommentList>
    </Styled.PostContainer>
  );
};

export default Post;
