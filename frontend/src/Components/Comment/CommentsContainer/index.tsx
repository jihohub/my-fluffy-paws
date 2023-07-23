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
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const location = useLocation();
  const isPostRoute = location.pathname.startsWith("/post/");

  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number>(0);

  const handleMenuClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  const handleLikeComment = async () => {
    await dispatch(likeComment({ commentId, token }));
    await dispatch(fetchComments(commentId));
    // setIsLiked(true);
  };

  const handleUnlikeComment = async () => {
    await dispatch(unlikeComment({ commentId, token }));
    await dispatch(fetchComments(commentId));
    // setIsLiked(false);
  };

  const handleIconClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    handleMenuClick();
    id && setCommentId(id);
  };

  return (
    <Styled.CommentContainer>
      {comments?.map((comment) => (
        <CommentItem comment={comment} key={comment.commentId} />
      ))}
      {isToastVisible && <Toast toastProps={{ path: "comment", commentId }} />}
      {/* {selectedPost && (
        <Modal onClose={handleCloseModal} modalRef={modalRef}>
          <CommentsContainer comments={selectedPost.comments} />
        </Modal>
      )} */}
    </Styled.CommentContainer>
  );
};

export default CommentsContainer;
