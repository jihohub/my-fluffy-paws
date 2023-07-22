import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import { BsThreeDotsVertical, BsHeart, BsHeartFill } from "react-icons/bs";
import Toast from "../../Toast";
import PostContainer from "../PostContainer";

export interface PostsContainerProps {
  posts: PostData[];
}

const PostsContainer: React.FC<PostsContainerProps> = ({ posts }) => {
  console.log("posts", posts);

  return (
    <>
      {posts.map((post) => (
        <PostContainer post={post} />
      ))}
    </>
  );
};

export default PostsContainer;
