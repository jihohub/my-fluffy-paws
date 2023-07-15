import React from "react";
import Styled from "./index.styles";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <Styled.HeaderContainer>
      <Styled.LogoImage src="./logo.png" onClick={handleLogoClick} />
      <Styled.ButtonContainer>
        <Button color={"#8D7B68"} text="로그인" onClick={handleLoginClick} />
        <Button color={"#8D7B68"} text="회원가입" onClick={handleSignupClick} />
      </Styled.ButtonContainer>
    </Styled.HeaderContainer>
  );
};

export default Header;
