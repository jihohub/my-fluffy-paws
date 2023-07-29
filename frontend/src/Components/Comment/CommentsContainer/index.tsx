import React, { useEffect } from "react";
import Styled from "./index.styles";
import {
  fetchCommentsByPostId,
  selectComments,
} from "../../../store/reducers/commentSlice";
import CommentItem from "../CommentItem";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

export interface CommentsContainerProps {
  postId: number;
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({ postId }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const comments = useSelector(selectComments);

  useEffect(() => {
    dispatch(fetchCommentsByPostId(postId));
  }, []);

  return (
    <Styled.CommentContainer>
      {comments?.map((comment) => (
        <CommentItem comment={comment} key={comment.commentId} />
      ))}
    </Styled.CommentContainer>
  );
};

export default CommentsContainer;
