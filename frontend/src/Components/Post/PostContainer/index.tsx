import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import {
  selectUser,
} from "../../../store/reducers/userSlice";
import { Post as PostData, fetchPostById } from "../../../store/reducers/postSlice";
import { selectAccessToken } from "../../../store/reducers/tokenSlice";
import { likePost, unlikePost } from "../../../store/reducers/likeSlice";
import { BsThreeDotsVertical, BsHeart, BsHeartFill } from "react-icons/bs";
import Toast from "../../Toast";

import AuthorView from "../AuthorView";
import PostView from "../PostView";
import LikeView from "../LikeView";

export interface PostContainerProps {
  post: PostData
}

const PostContainer: React.FC<PostContainerProps> = ({ post }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const location = useLocation();
  const isPostRoute = location.pathname.startsWith("/post/");

  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  // const [isLiked, setIsLiked] = useState<boolean>(
  //   user !== null &&
  //     post.likedUser.some((likedUser) => likedUser.userId === user.userId)
  // );

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
    // userId,
    // userImage,
    // userName,
  } = post;

  console.log("commentCount", commentCount);
  console.log("comments", comments);
  console.log("createdAt", createdAt);
  console.log("updatedAt", updatedAt);
  console.log("image", image);
  console.log("likeCount", likeCount);
  console.log("likedUser", likedUser);
  console.log("postId", postId);
  console.log("text", text);
  console.log("User", User);
  // console.log("userId", userId);
  // console.log("userImage", userImage);
  // console.log("userName", userName);


  
  

  return (
    <Styled.PostContainer>
      <AuthorView author={User}></AuthorView>
      <PostView post={{ postId, text, image }}></PostView>
      <LikeView like={{ likeCount, likedUser }}></LikeView>
      {/* <CommentView></CommentView> */}
    </Styled.PostContainer>
    // <Styled.PostContainer>
    //   <Styled.AuthorContainer to={`/user/${post.userId}`}>
    //     <Styled.AuthorImage src={post.userImage} alt="User Image" />
    //     <Styled.AuthorName>{post.userName}</Styled.AuthorName>
    //     {isPostRoute && user?.userId === post.userId && (
    //       <Styled.IconConatainer>
    //         <BsThreeDotsVertical onClick={handleIconClick} />
    //       </Styled.IconConatainer>
    //     )}
    //   </Styled.AuthorContainer>
    //   {!isPostRoute ? (
    //     <Styled.ContentLinkContainer to={`/post/${post.postId}`}>
    //       <Styled.PostImage src={post.image} alt="Post" />
    //       <Styled.PostText>{post.text}</Styled.PostText>
    //       <Styled.LikesContainer>
    //         <Styled.LikesCount>{post.likedUser.length} likes</Styled.LikesCount>
    //         {/* <Styled.HeartConatainer>
    //           {isLiked ? (
    //             <BsHeartFill onClick={handleUnlikePost} />
    //           ) : (
    //             <BsHeart onClick={handleLikePost} />
    //           )}
    //         </Styled.HeartConatainer> */}
    //         <Styled.LikedUser>{renderLikedUsers()}</Styled.LikedUser>
    //       </Styled.LikesContainer>
    //     </Styled.ContentLinkContainer>
    //   ) : (
    //     <Styled.ContentContainer>
    //       <Styled.PostImage src={post.image} alt="Post" />
    //       <Styled.PostText>{post.text}</Styled.PostText>
    //       <Styled.LikesContainer>
    //         <Styled.LikesCount>{post.likedUser.length} likes</Styled.LikesCount>
    //         {/* <Styled.HeartConatainer>
    //           {isLiked ? (
    //             <BsHeartFill onClick={handleUnlikePost} />
    //           ) : (
    //             <BsHeart onClick={handleLikePost} />
    //           )}
    //         </Styled.HeartConatainer> */}
    //         <Styled.LikedUser>{renderLikedUsers()}</Styled.LikedUser>
    //       </Styled.LikesContainer>
    //     </Styled.ContentContainer>
    //   )}

    //   {isToastVisible && <Toast path="post" />}
    // </Styled.PostContainer>
  );
};

export default PostContainer;
