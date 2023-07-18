import React, { useEffect, useState } from "react";
import Styled from "./index.styles";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { selectAccessToken } from "../../store/reducers/tokenSlice";
import { logout, selectUser } from "../../store/reducers/userSlice";
import { GoHome } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { BiMoviePlay } from "react-icons/bi";
import Button from "../Button";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const accessToken = useSelector(selectAccessToken);
  const user = useSelector(selectUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(accessToken !== null);
  }, [accessToken]);

  const handleToProfile = () => {
    if (user) {
      navigate(`/user/${user.userId}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Styled.NavContainer>
      <Styled.NavItem to="/">
        <GoHome />
      </Styled.NavItem>
      <Styled.NavItem to="/search">
        <FaSearch />
      </Styled.NavItem>
      <Styled.NavItem to="/post/new">
        <CgAddR />
      </Styled.NavItem>
      <Styled.NavItem to="/movie">
        <BiMoviePlay />
      </Styled.NavItem>
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
