import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import { selectUser } from "../../../store/reducers/userSlice";
import { fetchPostById } from "../../../store/reducers/postSlice";
import { selectAccessToken } from "../../../store/reducers/tokenSlice";
import { likePost, unlikePost } from "../../../store/reducers/likeSlice";
import Toast from "../../Toast";
import Modal from "../../Modal";
import CommentsContainer from "../../Comment/CommentsContainer";
import CommentForm from "../../Comment/CommentForm";

export interface IconContainerProps {
  iconsProps: {
    postId: number;
    likedUser: {
      userId: number;
      User: {
        userId: number;
        userName: string;
        userImage: string;
      };
    }[];
  };
}

const Icons: React.FC<IconContainerProps> = ({ iconsProps }) => {
  const { postId, likedUser } = iconsProps;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);
  const [isLiked, setIsLiked] = useState<boolean>(
    likedUser.some((eachUser) => eachUser.userId === user?.userId)
  );
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleLikePost = async () => {
    if (user) {
      await dispatch(likePost({ postId, token }));
      await dispatch(fetchPostById(postId));
      setIsLiked(true);
    }
  };

  const handleUnlikePost = async () => {
    if (user) {
      await dispatch(unlikePost({ postId, token }));
      await dispatch(fetchPostById(postId));
      setIsLiked(false);
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  return (
    <>
      {!isLiked ? (
        <Styled.HeartIcon onClick={handleLikePost} />
      ) : (
        <Styled.HeartFillIcon onClick={handleUnlikePost} />
      )}
      <Styled.CommentIcon onClick={handleOpenModal} />
      {isToastVisible && <Toast toastProps={{ path: "user" }} />}
      {isModalVisible && (
        <Modal onClose={handleCloseModal} modalRef={modalRef}>
          <CommentsContainer postId={postId} />
          {user && <CommentForm postId={postId} />}
        </Modal>
      )}
    </>
  );
};

export default Icons;
