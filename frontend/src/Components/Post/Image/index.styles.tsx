import styled from "styled-components";
import { Link } from "react-router-dom";

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
  ContentLinkContainer,
  ContentContainer,
  PostImage,
  PostText,
};
