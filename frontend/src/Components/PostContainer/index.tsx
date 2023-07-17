import React from "react";
import Styled from "./index.styles";
import { Post as PostData } from "../../store/reducers/postSlice";

interface PostContainerProps {
  post: PostData;
}

const PostContainer: React.FC<PostContainerProps> = ({ post }) => {
  return (
    <Styled.PostContainer>
      <Styled.AuthorContainer to={`/user/${post.userId}`}>
        <Styled.AuthorImage src={post.userImage} alt="User Image" />
        <Styled.AuthorName>{post.userName}</Styled.AuthorName>
      </Styled.AuthorContainer>
      <Styled.ContentContainer to={`/post/${post.postId}`}>
        <Styled.PostImage src={post.image} alt="Post" />
        <Styled.PostText>{post.text}</Styled.PostText>
      </Styled.ContentContainer>
    </Styled.PostContainer>
  );
};

export default PostContainer;
