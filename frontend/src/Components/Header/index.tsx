import React from "react";
import Styled from "./index.styles";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
// import logo from "./logo.png";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Styled.HeaderContainer>
      <Styled.LogoImage src="./logo.png" onClick={handleLogoClick} />
      <Styled.ButtonContainer>
        <Button color={"#8D7B68"} text="로그인" />
        <Button color={"#8D7B68"} text="회원가입" />
      </Styled.ButtonContainer>
    </Styled.HeaderContainer>
  );
};

export default Header;
