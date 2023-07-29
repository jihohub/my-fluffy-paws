import React from "react";
import Styled from "./index.styles";
import { Post as PostData } from "../../../store/reducers/postSlice";

interface PostContainerProps {
  posts: PostData[];
}

const PostGrid: React.FC<PostContainerProps> = ({ posts }) => {
  return (
    <Styled.PostContainer>
      {posts?.map((post) => (
        <Styled.HoverContainer to={`/post/${post.postId}`} key={post.postId}>
          <Styled.PostImage src={post.image} alt="Post" />
          <Styled.PostHover>
            <Styled.HeartFillIcon />
            <Styled.PostLikeCount>
              {post?.likeCount || 0}
            </Styled.PostLikeCount>
            <Styled.CommentIcon />
            <Styled.PostCommentCount>
              {post?.commentCount || 0}
            </Styled.PostCommentCount>
          </Styled.PostHover>
        </Styled.HoverContainer>
      ))}
    </Styled.PostContainer>
  );
};

export default PostGrid;
