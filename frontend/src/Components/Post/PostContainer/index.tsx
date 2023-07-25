import React from "react";
import Styled from "./index.styles";
import { Post as PostData } from "../../../store/reducers/postSlice";
import Author from "../Author";
import Image from "../Image";
import Text from "../Text";
import Like from "../Like";
import Icons from "../Icons";
import Comments from "../../Comment/Comments";
import PostDate from "../PostDate";

export interface PostContainerProps {
  post: PostData
}

const PostContainer: React.FC<PostContainerProps> = ({ post }) => {
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
  } = post;

  return (
    <Styled.PostContainer>
      <Author authorProps={{ postId, author: User }} />
      <Image image={image} />
      <Icons iconsProps={{ postId, likedUser, comments }} />
      <Like likeProps={{ likeCount, likedUser }} />
      <Text text={text} />
      <Comments commentsProps={{ postId, commentCount, comments }} />
      <PostDate createdAt={createdAt} />
    </Styled.PostContainer>
  );
};

export default PostContainer;
