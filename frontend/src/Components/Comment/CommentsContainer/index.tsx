import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import { selectUser } from "../../../store/reducers/userSlice";
import { fetchPostById } from "../../../store/reducers/postSlice";
import { fetchComments } from "../../../store/reducers/commentSlice";
import { selectAccessToken } from "../../../store/reducers/tokenSlice";
import { likeComment, unlikeComment } from "../../../store/reducers/likeSlice";
import moment from "moment";
import "moment/locale/ko";
import { BsThreeDotsVertical, BsHeart, BsHeartFill } from "react-icons/bs";
import Toast from "../../Toast";
import { Comment } from "../../../store/reducers/commentSlice";
import CommentItem from "../CommentItem";

export interface CommentsContainerProps {
  comments: Comment[];
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({ comments }) => {
  return (
    <Styled.CommentContainer>
      {comments?.map((comment) => (
        <CommentItem comment={comment} key={comment.commentId} />
      ))}
    </Styled.CommentContainer>
  );
};

export default CommentsContainer;
