import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Styled from "./index.styles";
import { selectUser } from "../../store/reducers/userSlice";
import { Post as PostData } from "../../store/reducers/postSlice";
import { BsThreeDotsVertical } from "react-icons/bs"
import Toast from "../../Components/Toast";

interface PostContainerProps {
  post: PostData;
}

const PostContainer: React.FC<PostContainerProps> = ({ post }) => {
  const location = useLocation();
  const isPostRoute = location.pathname.startsWith("/post/");

  const user = useSelector(selectUser);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const handleMenuClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  const handleIconClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    handleMenuClick();
  };

  return (
    <Styled.PostContainer>
      <Styled.AuthorContainer to={`/user/${post.userId}`}>
        <Styled.AuthorImage src={post.userImage} alt="User Image" />
        <Styled.AuthorName>{post.userName}</Styled.AuthorName>
        {isPostRoute && user?.userId === post.userId && (
          <BsThreeDotsVertical onClick={handleIconClick} />
        )}
      </Styled.AuthorContainer>
      <Styled.ContentContainer to={`/post/${post.postId}`}>
        <Styled.PostImage src={post.image} alt="Post" />
        <Styled.PostText>{post.text}</Styled.PostText>
      </Styled.ContentContainer>
      {isToastVisible && <Toast />}
    </Styled.PostContainer>
  );
};

export default PostContainer;
