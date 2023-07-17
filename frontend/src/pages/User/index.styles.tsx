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
  margin-top: 30px;

  h2 {
    font-size: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 10px;

    li {
      font-size: 16px;
      margin-bottom: 5px;
    }
  }
`;

export default {
  UserProfileContainer,
  UserImage,
  UserName,
  PostsContainer,
};
