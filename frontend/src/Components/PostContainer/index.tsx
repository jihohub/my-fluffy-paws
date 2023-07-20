import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import {
  selectUser,
  selectUsersLikePost,
  getUsersInfoBatch,
} from "../../store/reducers/userSlice";
import { Post as PostData } from "../../store/reducers/postSlice";
import { User } from "../../store/reducers/userSlice";
import { BsThreeDotsVertical } from "react-icons/bs"
import Toast from "../../Components/Toast";

interface PostContainerProps {
  post: PostData;
}

interface UserInfo {
  userId: number;
  userName: string;
  userImage: string;
}

const PostContainer: React.FC<PostContainerProps> = ({ post }) => {
  const location = useLocation();
  const isPostRoute = location.pathname.startsWith("/post/");

  const user = useSelector(selectUser);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  console.log(post)


  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const handleMenuClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  const handleIconClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    handleMenuClick();
  };

  const likedUsersWithInfo = useSelector(selectUsersLikePost);

  useEffect(() => {
    if (post.likedUsers && post.likedUsers.length > 0) {
      const userIds = post.likedUsers.map((user) => user.userId);
      dispatch(getUsersInfoBatch(userIds));
    }
  }, [dispatch, post.likedUsers]);

  const renderLikedUsers = () => {
    if (likedUsersWithInfo && likedUsersWithInfo.length > 0) {
      return likedUsersWithInfo.map((user) => (
        <Styled.LikedUser key={user.userId}>
          <Styled.LikedUserImage src={user.userImage} alt="Liked User" />
          <Styled.LikedUserName>{user.userName}</Styled.LikedUserName>
        </Styled.LikedUser>
      ));
    } else {
      return <Styled.LikedUser>No likes yet</Styled.LikedUser>;
    }
  };

  return (
    <Styled.PostContainer>
      <Styled.AuthorContainer to={`/user/${post.userId}`}>
        <Styled.AuthorImage src={post.userImage} alt="User Image" />
        <Styled.AuthorName>{post.userName}</Styled.AuthorName>
        {isPostRoute && user?.userId === post.userId && (
          <Styled.IconConatainer>
            <BsThreeDotsVertical onClick={handleIconClick} />
          </Styled.IconConatainer>
        )}
      </Styled.AuthorContainer>
      {!isPostRoute ? (
        <Styled.ContentLinkContainer to={`/post/${post.postId}`}>
          <Styled.PostImage src={post.image} alt="Post" />
          <Styled.PostText>{post.text}</Styled.PostText>
          <Styled.LikesContainer>
            <Styled.LikesCount>{post.likedUsers.length} likes</Styled.LikesCount>
            <Styled.LikedUser>{renderLikedUsers()}</Styled.LikedUser>
          </Styled.LikesContainer>
        </Styled.ContentLinkContainer>
      ) : (
        <Styled.ContentContainer>
          <Styled.PostImage src={post.image} alt="Post" />
          <Styled.PostText>{post.text}</Styled.PostText>
          <Styled.LikesContainer>
            <Styled.LikesCount>
              {post.likedUsers.length} likes
            </Styled.LikesCount>
            <Styled.LikedUser>{renderLikedUsers()}</Styled.LikedUser>
          </Styled.LikesContainer>
        </Styled.ContentContainer>
      )}

      {isToastVisible && <Toast path="post" />}
    </Styled.PostContainer>
  );
};

export default PostContainer;
