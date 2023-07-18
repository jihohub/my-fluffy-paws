import styled from "styled-components";
import { Link } from "react-router-dom";

const PostContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
`;

const AuthorContainer = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

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

const ContentContainer = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const PostText = styled.p`
  font-size: 24px;
  margin-bottom: 10px;
  text-decoration: none;
`;

export default {
  PostContainer,
  AuthorContainer,
  AuthorImage,
  AuthorName,
  ContentContainer,
  PostImage,
  PostText,
};
