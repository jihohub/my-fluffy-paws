import React from "react";
import { useParams } from "react-router-dom";
import Styled from "./index.styles";

const posts = [
  {
    id: 1,
    user: {
      username: "john_doe",
      profileImage: "https://cataas.com/cat",
    },
    image: "https://cataas.com/cat",
    content: "This is a post content.",
    comments: [
      { id: 1, text: "Great post!" },
      { id: 2, text: "Nice photo!" },
    ],
  },
  {
    id: 2,
    user: {
      username: "jane_smith",
      profileImage: "https://cataas.com/cat",
    },
    image: "https://cataas.com/cat",
    content: "Another post.",
    comments: [
      { id: 3, text: "Lovely picture!" },
      { id: 4, text: "Beautiful view!" },
    ],
  },
];

const Post = () => {
  const { postId } = useParams();
  const post = posts.find((post) => post.id.toString() === postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Styled.PostContainer>
      <Styled.PostTitle>{post.content}</Styled.PostTitle>
      <Styled.PostAuthor>Posted by: {post.user.username}</Styled.PostAuthor>
      <Styled.PostImage src={post.image} alt="Post" />
      <h3>Comments:</h3>
      <Styled.CommentList>
        {post.comments.map((comment) => (
          <Styled.CommentItem key={comment.id}>{comment.text}</Styled.CommentItem>
        ))}
      </Styled.CommentList>
    </Styled.PostContainer>
  );
};

export default Post;
