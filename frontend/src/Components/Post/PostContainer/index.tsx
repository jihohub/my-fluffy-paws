import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import { selectUser } from "../../../store/reducers/userSlice";
import { Post as PostData, fetchPostById } from "../../../store/reducers/postSlice";
import { selectAccessToken } from "../../../store/reducers/tokenSlice";
import { likePost, unlikePost } from "../../../store/reducers/likeSlice";
import { BsThreeDotsVertical, BsHeart, BsHeartFill } from "react-icons/bs";
import Toast from "../../Toast";

import Author from "../Author";
import Image from "../Image";
import Text from "../Text";
import Like from "../Like";
import Icons from "../Icons";
import Comments from "../../Comment/Comments";

export interface PostContainerProps {
  post: PostData
}

const PostContainer: React.FC<PostContainerProps> = ({ post }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const {
    commentCount,
    comments,
    createdAt,
    updatedAt,
    image,
    likeCount,
    likedUser,
    postId,
    text,
    User,
  } = post;

  return (
    <Styled.PostContainer>
      <Author authorProps={{ postId, author: User }} />
      <Image image={image} />
      <Icons iconsProps={{ postId, likedUser, comments }} />
      <Like likeProps={{ likeCount, likedUser }}></Like>
      <Text text={text} />
      <Comments commentsProps={{ postId, commentCount, comments }}></Comments>
    </Styled.PostContainer>
  );
};

export default PostContainer;