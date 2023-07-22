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
import { likePost, unlikePost } from "../../../store/reducers/likeSlice";
import { BsThreeDotsVertical, BsHeart, BsHeartFill } from "react-icons/bs";
import moment from "moment";
import "moment/locale/ko";
import Toast from "../../Toast";
import { Comment } from "../../../store/reducers/commentSlice";

export interface LikeContainerProps {
  likeProps: {
    likeCount: number;
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

const Like: React.FC<LikeContainerProps> = ({ likeProps }) => {
  const { likeCount, likedUser } = likeProps;
  const countText = likeCount > 0 && `좋아요 ${likeCount}개`;

  return <Styled.CountText>{countText}</Styled.CountText>;
};

export default Like;
