import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Styled from "./index.styles";

const Home = () => {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   // API 호출 등으로 게시물 데이터를 가져와서 설정하는 로직
  //   const fetchPosts = async () => {
  //     // 게시물 데이터를 가져오는 API 호출
  //     const response = await fetch("/api/posts");
  //     const data = await response.json();
  //     setPosts(data);
  //   };

  //   fetchPosts();
  // }, []);

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

  return (
    <Styled.MainContainer>
      {posts.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id}>
          <Styled.PostContainer key={post.id}>
            <Styled.UserContainer>
              <Styled.ProfileImage src={post.user.profileImage} alt="Profile" />
              <Styled.Username>{post.user.username}</Styled.Username>
            </Styled.UserContainer>
            <Styled.PostImage src={post.image} alt="Post" />
            <Styled.PostContent>{post.content}</Styled.PostContent>
            <Styled.CommentsContainer>
              {post.comments.map((comment) => (
                <Styled.Comment key={comment.id}>{comment.text}</Styled.Comment>
              ))}
            </Styled.CommentsContainer>
          </Styled.PostContainer>
        </Link>
      ))}
    </Styled.MainContainer>
  );
};

export default Home;
