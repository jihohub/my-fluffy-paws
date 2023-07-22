import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import { selectUser } from "../../../store/reducers/userSlice";
import {
  Post as PostData,
  fetchPostById,
} from "../../../store/reducers/postSlice";
import { selectAccessToken } from "../../../store/reducers/tokenSlice";
import { likePost, unlikePost } from "../../../store/reducers/likeSlice";
import Toast from "../../Toast";

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
  }
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

  const handleLikePost = async () => {
    await dispatch(likePost({ postId, token }));
    await dispatch(fetchPostById(postId));
    setIsLiked(true);
  };

  const handleUnlikePost = async () => {
    await dispatch(unlikePost({ postId, token }));
    await dispatch(fetchPostById(postId));
    setIsLiked(false);
  };

  const handleCommentClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  return (
    <>
      {!isLiked ? (
        <Styled.HeartIcon onClick={handleLikePost} />
      ) : (
        <Styled.HeartFillIcon onClick={handleUnlikePost} />
      )}
      <Styled.CommentIcon onClick={handleCommentClick} />
      {isToastVisible && <Toast path="user" />}
    </>
  );
};

export default Icons;
