import styled from "styled-components";

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.h2`
  margin-top: 20px;
  font-size: 24px;
`;

const PostsContainer = styled.div`
  margin-top: 10px;
`;

export default {
  UserProfileContainer,
  UserImage,
  UserName,
  PostsContainer,
};
