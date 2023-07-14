import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
`;

const LogoImage = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  display: flex;
  margin-top: 10px;
`;

const NavItem = styled.div`
  margin-right: 10px;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

export default {
  HeaderContainer,
  LogoImage,
  Nav,
  NavItem,
  NavLink,
  ButtonContainer,
  Button,
};
