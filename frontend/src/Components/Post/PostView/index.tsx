import React, { useEffect, useState } from "react";
import Styled from "./index.styles";

export interface PostContainerProps {
  post: {
    postId: number;
    text: string;
    image: string;
  };
}

const PostView: React.FC<PostContainerProps> = ({ post }) => {
  return (
    <Styled.ContentLinkContainer to={`/post/${post.postId}`}>
      <Styled.PostImage src={post.image} alt="Post" />
      <Styled.PostText>{post.text}</Styled.PostText>
    </Styled.ContentLinkContainer>
  );
};

export default PostView;
