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

export interface CommentsContainerProps {
  comments: Comment[];
}

const CommentsView: React.FC<CommentsContainerProps> = ({ comments }) => {
  

  return (
    <Styled.CommentContainer>
      {comments?.map((comment) => (
        <Styled.CommentItem key={comment.commentId}>
          <Styled.LinkContainer to={`/user/${comment.userId}`}>
            <Styled.CommentUserImage
              src={comment.User.userImage}
              alt="User Image"
            />
          </Styled.LinkContainer>
          <Styled.TextContainer>
            <Styled.UpperContainer>
              <Styled.CommentUserName>
                {comment.User.userName}
              </Styled.CommentUserName>
              <Styled.CommentDate>
                {moment(comment.createdAt).fromNow()}
              </Styled.CommentDate>
            </Styled.UpperContainer>
            <Styled.LowerContainer>
              <Styled.CommentText>{comment.text}</Styled.CommentText>
            </Styled.LowerContainer>
            </Styled.TextContainer>
        </Styled.CommentItem>
      ))}
    </Styled.CommentContainer>
  );
};

export default CommentsView;
