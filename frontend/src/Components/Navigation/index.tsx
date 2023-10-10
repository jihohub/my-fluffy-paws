import React, { useEffect, useState } from "react";
import Styled from "./index.styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAccessToken } from "../../store/reducers/tokenSlice";
import { selectUser } from "../../store/reducers/userSlice";
import { GoHome } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { BiChat } from "react-icons/bi";

const Navigation = () => {
  const navigate = useNavigate();
  const accessToken = useSelector(selectAccessToken);
  const user = useSelector(selectUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  const handleToProfile = () => {
    if (user) {
      navigate(`/user/${user.userId}`);
    }
  };

  return (
    <Styled.NavContainer>
      <Styled.NavItem to="/">
        <GoHome />
      </Styled.NavItem>
      <Styled.NavItem to="/search">
        <FaSearch />
      </Styled.NavItem>
      {!isLoggedIn ? (
        <Styled.NavItem to="/login">
          <CgAddR />
        </Styled.NavItem>
      ) : (
        <Styled.NavItem to="/post/new">
          <CgAddR />
        </Styled.NavItem>
      )}      
      {!isLoggedIn ? (
        <Styled.NavItem to="/login">
          <BiChat />
        </Styled.NavItem>
      ) : (
        <Styled.NavItem to="/chat">
          <BiChat />
        </Styled.NavItem>
      )}
      {!isLoggedIn ? (
        <Styled.NavItem to="/login">
          <FaUser />
        </Styled.NavItem>
      ) : (
        <Styled.UserImageContainer onClick={handleToProfile}>
          <Styled.UserImage src={user?.userImage} />
        </Styled.UserImageContainer>
      )}
    </Styled.NavContainer>
  );
};

export default Navigation;
