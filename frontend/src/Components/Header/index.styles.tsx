import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  width: 100%;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin: 0;
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

  &:hover {
    text-decoration: underline;
  }
`;

export default {
  HeaderContainer,
  Logo,
  Nav,
  NavItem,
  NavLink,
};
