import React, { useEffect, useState, useRef } from "react";
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
import Modal from "../../Modal";
import CommentsContainer from "../CommentsContainer";
import CommentForm from "../CommentForm";

import { Comment as CommentData } from "../../../store/reducers/commentSlice";

export interface CommentsContainerProps {
  commentProps: {
    commentCount: number;
    comments: CommentData[];
  };
}

const Comment: React.FC<CommentsContainerProps> = ({ commentProps }) => {
  const { commentCount, comments } = commentProps;
  const countText = commentCount > 0 && `댓글 ${commentCount}개 보기`;

  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleMenuClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Styled.CommentContainer>
      <Styled.CountText onClick={handleOpenModal}>{countText}</Styled.CountText>
      {isToastVisible && <Toast path="user" />}
      {isModalVisible && <Modal onClose={handleCloseModal} modalRef={modalRef}>
        <CommentsContainer comments={comments} />
        <CommentForm />
      </Modal>}
      {/* {comments?.map((comment) => (
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
      ))} */}
    </Styled.CommentContainer>
  );
};

export default Comment;
