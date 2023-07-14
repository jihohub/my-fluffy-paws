import styled from "styled-components";

const PostContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
`;

const AuthorContainer = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const AuthorImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AuthorName = styled.p`
  font-weight: bold;
  margin-right: 5px;
  text-decoration: none;
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  font-size: 24px;
  margin-bottom: 10px;
  text-decoration: none;
`;

export default {
  PostContainer,
  AuthorContainer,
  AuthorImage,
  AuthorName,
  PostImage,
  PostContent,
};
