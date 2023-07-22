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
  like: {
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

const LikeView: React.FC<LikeContainerProps> = ({ like }) => {
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
  // const handleLikePost = async () => {
  //   await dispatch(likePost({ postId: post.postId, token }));
  //   await dispatch(fetchPostById(post.postId));
  //   // setIsLiked(true);
  // };

  // const handleUnlikePost = async () => {
  //   await dispatch(unlikePost({ postId: post.postId, token }));
  //   await dispatch(fetchPostById(post.postId));
  //   // setIsLiked(false);
  // };

  const handleMenuClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  const handleIconClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    handleMenuClick();
  };

  // const renderLikedUsers = () => {
  //   if (post.likedUser && post.likedUser.length > 0) {
  //     return post.likedUser.map((eachUser) => (
  //       <Styled.LikedUser key={eachUser.User.userId}>
  //         <Styled.LikedUserImage
  //           src={eachUser.User.userImage}
  //           alt="Liked User"
  //         />
  //         <Styled.LikedUserName>{eachUser.User.userName}</Styled.LikedUserName>
  //       </Styled.LikedUser>
  //     ));
  //   } else {
  //     return <Styled.LikedUser>No likes yet</Styled.LikedUser>;
  //   }
  // };
  return (
    <></>
    // <Styled.CommentContainer>
    //   {comments?.map((comment) => (
    //     <Styled.CommentItem key={comment.commentId}>
    //       <Styled.LinkContainer to={`/user/${comment.userId}`}>
    //         <Styled.CommentUserImage
    //           src={comment.User.userImage}
    //           alt="User Image"
    //         />
    //       </Styled.LinkContainer>
    //       <Styled.TextContainer>
    //         <Styled.UpperContainer>
    //           <Styled.CommentUserName>
    //             {comment.User.userName}
    //           </Styled.CommentUserName>
    //           <Styled.CommentDate>
    //             {moment(comment.createdAt).fromNow()}
    //           </Styled.CommentDate>
    //         </Styled.UpperContainer>
    //         <Styled.LowerContainer>
    //           <Styled.CommentText>{comment.text}</Styled.CommentText>
    //         </Styled.LowerContainer>
    //       </Styled.TextContainer>
    //     </Styled.CommentItem>
    //   ))}
    // </Styled.CommentContainer>
  );
};

export default LikeView;
