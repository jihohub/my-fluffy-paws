import React, { useEffect, useState } from "react";
import Styled from "./index.styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { logout, selectToken } from "../../store/reducers/userSlice";
import Button from "../Button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const token = useSelector(selectToken);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedin(token !== null);
  }, [token]);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <Styled.HeaderContainer>
      <Styled.LogoImage src="./logo.png" onClick={handleLogoClick} />
      <Styled.ButtonContainer>
        {!isLoggedin ? (
          <>
            <Button
              color={"#8D7B68"}
              text="로그인"
              onClick={handleLoginClick}
            />
            <Button
              color={"#8D7B68"}
              text="회원가입"
              onClick={handleSignupClick}
            />
          </>
        ) : (
          <Button
            color={"#8D7B68"}
            text="로그아웃"
            onClick={handleLogoutClick}
          />
        )}
      </Styled.ButtonContainer>
    </Styled.HeaderContainer>
  );
};

export default Header;
