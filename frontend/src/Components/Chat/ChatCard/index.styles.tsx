import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 500px;
  max-width: 500px;
  padding: 8px;
  border-radius: 8px;
  margin-top: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const UserDiv = styled.div`
  position: relative;
  display: flex;
  width: 250px;
  align-items: center;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const UserName = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export default {
  Wrapper,
  UserDiv,
  UserImage,
  UserName,
};
