import styled from "styled-components";

const UserContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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
  right: 20px;

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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
`;

const FollowButton = styled.button`
  flex: 1;
  padding: 12px;
  background-color: #8d7b68;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #6c5d4b;
  }
`;

const MessageButton = styled.button`
  flex: 1;
  margin-left: 16px;
  padding: 12px;
  background-color: #999;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #888;
  }
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
  ButtonsContainer,
  FollowButton,
  MessageButton,
  PostsContainer,
};
