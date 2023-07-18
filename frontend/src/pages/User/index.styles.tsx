import styled from "styled-components";

const UserContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 600px;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 50px;
`;

const UserName = styled.p`
  font-size: 24px;
  margin-left: 40px;
  margin-bottom: 40px;
  font-weight: bold;
`;

const MenuContainer = styled.div`
  position: absolute;
  up: 0;
  right: 0;

  svg {
    font-size: 36px;
    color: #8d7b68;
  }
`;

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 600px;
  max-width: 600px;
`;

const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const UserStatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserStat = styled.p`
  font-size: 24px;
`;

const PostsContainer = styled.div`
  margin-top: 10px;
`;

export default {
  UserContainer,
  UserName,
  MenuContainer,
  UserProfileContainer,
  UserImage,
  UserStatContainer,
  UserStat,
  PostsContainer,
};
