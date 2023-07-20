import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Styled from "./index.styles";
import {
  selectUser,
} from "../../store/reducers/userSlice";
import { Post as PostData } from "../../store/reducers/postSlice";
import { BsThreeDotsVertical } from "react-icons/bs"
import Toast from "../../Components/Toast";
import { CommentsContainerProps } from "../CommentsContainer";

export interface PostContainerProps {
  post: PostData
}

const PostContainer: React.FC<PostContainerProps> = ({ post }) => {
  const location = useLocation();
  const isPostRoute = location.pathname.startsWith("/post/");

  const user = useSelector(selectUser);
  console.log(post);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const handleMenuClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  const handleIconClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    handleMenuClick();
  };

  const renderLikedUsers = () => {
    if (post.likedUser && post.likedUser.length > 0) {
      return post.likedUser.map((eachUser) => (
        <Styled.LikedUser key={eachUser.User.userId}>
          <Styled.LikedUserImage
            src={eachUser.User.userImage}
            alt="Liked User"
          />
          <Styled.LikedUserName>{eachUser.User.userName}</Styled.LikedUserName>
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
            <Styled.LikesCount>{post.likedUser.length} likes</Styled.LikesCount>
            <Styled.LikedUser>{renderLikedUsers()}</Styled.LikedUser>
          </Styled.LikesContainer>
        </Styled.ContentLinkContainer>
      ) : (
        <Styled.ContentContainer>
          <Styled.PostImage src={post.image} alt="Post" />
          <Styled.PostText>{post.text}</Styled.PostText>
          <Styled.LikesContainer>
            <Styled.LikesCount>{post.likedUser.length} likes</Styled.LikesCount>
            <Styled.LikedUser>{renderLikedUsers()}</Styled.LikedUser>
          </Styled.LikesContainer>
        </Styled.ContentContainer>
      )}

      {isToastVisible && <Toast path="post" />}
    </Styled.PostContainer>
  );
};

export default PostContainer;
