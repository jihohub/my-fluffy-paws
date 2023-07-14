import React from "react";
import Styled from "./index.styles";
import { Post as PostData } from "../../store/reducers/postSlice";

interface PostContainerProps {
  post: PostData;
}

const PostContainer: React.FC<PostContainerProps> = ({ post }) => {
  return (
    <Styled.PostContainer>
      <Styled.AuthorContainer>
        <Styled.AuthorImage src={post.userImage} alt="User Image" />
        <Styled.AuthorName>{post.userName}</Styled.AuthorName>
      </Styled.AuthorContainer>
      <Styled.PostImage src={post.image} alt="Post" />
      <Styled.PostContent>{post.content}</Styled.PostContent>
    </Styled.PostContainer>
  );
};

export default PostContainer;
