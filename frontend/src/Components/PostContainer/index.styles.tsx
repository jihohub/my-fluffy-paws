import styled from "styled-components";
import { Link } from "react-router-dom";

const PostContainer = styled.div`
  margin: 0 auto;
  padding: 10px;
`;

const AuthorContainer = styled(Link)`
  position: relative;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const IconConatainer = styled.div`
  position: absolute;
  right: 0;
  padding-left: 50px;
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
  color: #000;
`;

const ContentLinkContainer = styled(Link)`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
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
  color: #000;
`;

export default {
  PostContainer,
  AuthorContainer,
  IconConatainer,
  AuthorImage,
  AuthorName,
  ContentLinkContainer,
  ContentContainer,
  PostImage,
  PostText,
};
