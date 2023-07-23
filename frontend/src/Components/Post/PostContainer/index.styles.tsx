import styled from "styled-components";
import { Link } from "react-router-dom";

const PostContainer = styled.div`
  margin: 30px auto;
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

const LikesContainer = styled.div`
  margin-top: 8px;
`;

const LikedUser = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const LikedUserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

const LikedUserName = styled.span`
  font-weight: 500;
`;

const LikesCount = styled.span`
  font-size: 14px;
  color: #888;
  margin-top: 4px;
`;

const HeartConatainer = styled.div`
  padding-left: 50px;

  svg {
    color: red;
  }
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
  LikesContainer,
  LikedUser,
  LikedUserImage,
  LikedUserName,
  LikesCount,
  HeartConatainer,
};
