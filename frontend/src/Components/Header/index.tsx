import React from "react";
import Styled from "./index.styles";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Styled.HeaderContainer>
      <Styled.LogoImage src="./logo.png" onClick={handleLogoClick} />
    </Styled.HeaderContainer>
  );
};

export default Header;
