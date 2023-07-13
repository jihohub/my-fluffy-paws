import React from "react";
import Styled from "./index.styles";

const Header: React.FC = () => {
  return (
    <Styled.HeaderContainer>
      <Styled.Logo>MyApp</Styled.Logo>
      <Styled.Nav>
        <Styled.NavItem>
          <Styled.NavLink to="/">Home</Styled.NavLink>
        </Styled.NavItem>
        <Styled.NavItem>
          <Styled.NavLink to="/profile">Profile</Styled.NavLink>
        </Styled.NavItem>
        <Styled.NavItem>
          <Styled.NavLink to="/settings">Settings</Styled.NavLink>
        </Styled.NavItem>
      </Styled.Nav>
    </Styled.HeaderContainer>
  );
};

export default Header;
