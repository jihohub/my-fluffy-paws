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
      <Styled.CommentList>
        {post.Comments?.length > 0 ? (
          post.Comments.map((comment) => (
            <Styled.CommentItem key={comment.commentId}>
              <Styled.CommentUserImage
                src={comment.User.userImage}
                alt="User Image"
              />
              <Styled.CommentUserName>
                {comment.User.userName}
              </Styled.CommentUserName>
              <Styled.CommentContent>{comment.content}</Styled.CommentContent>
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
