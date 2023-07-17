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
  display: grid;
  width: 600px;
  max-width: 600px;
  grid-template-columns: repeat(3, 1fr); // 3개의 열로 구성
  gap: 10px; // 열과 행 사이의 간격
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

export default {
  UserProfileContainer,
  UserImage,
  UserName,
  PostsContainer,
};
