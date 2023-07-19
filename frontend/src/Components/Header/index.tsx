// Header/index.tsx
import React, { useEffect, useState } from "react";
import Styled from "./index.styles";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/reducers/userSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import Toast from "../../Components/Toast";

const Header = () => {
  const user = useSelector(selectUser);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleMenuClick = () => {
    setIsToastVisible((prevState) => !prevState);
  };

  return (
    <Styled.HeaderContainer>
      {user ? (
        <Styled.UserContainer to={`/user/${user.userId}`}>
          <Styled.UserImage src={user.userImage} alt="User" />
          <Styled.UserName>{`${user.userName}님 반가워요!`}</Styled.UserName>
        </Styled.UserContainer>
      ) : (
        <Styled.LogoLink to="/">
          <Styled.LogoImage src="./logo.png" alt="Logo" />
        </Styled.LogoLink>
      )}
      <Styled.MenuIcon onClick={handleMenuClick}>
        <GiHamburgerMenu />
      </Styled.MenuIcon>
      {isToastVisible && <Toast />}
    </Styled.HeaderContainer>
  );
};

export default Header;
