import React from "react";
import { Post as PostData } from "../../../store/reducers/postSlice";
import PostContainer from "../PostContainer";

export interface PostsContainerProps {
  posts: PostData[];
}

const PostsContainer: React.FC<PostsContainerProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <PostContainer post={post} key={post.postId} />
      ))}
    </>
  );
};

export default PostsContainer;
