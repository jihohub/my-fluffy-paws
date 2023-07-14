import styled from "styled-components";

const PostContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const AuthorContainer = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const AuthorImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AuthorName = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const PostContent = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

export default {
  PostContainer,
  AuthorContainer,
  AuthorImage,
  AuthorName,
  PostImage,
  PostContent,
};
