// Header/index.styles.tsx
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  position: fixed;
  width: 500px;
  max-width: 500px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;
`;

const LogoImage = styled.img`
  width: 50%;
  height: 50%;
`;

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;
  cursor: pointer;
`;

const UserContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;
  cursor: pointer;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserName = styled.span`
  margin-left: 10px;
`;

const MenuIcon = styled.div`
  margin-right: 20px;
  font-size: 24px;
`;

const Styled = {
  HeaderContainer,
  LogoLink,
  LogoImage,
  HomeLink,
  UserContainer,
  UserImage,
  UserName,
  MenuIcon,
};

export default Styled;
