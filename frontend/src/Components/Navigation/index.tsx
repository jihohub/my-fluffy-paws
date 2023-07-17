import React, { useEffect, useState } from "react";
import Styled from "./index.styles";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { logout, selectToken, selectUser } from "../../store/reducers/userSlice";
import { GoHome } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { BiMoviePlay } from "react-icons/bi";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleToProfile = () => {
    navigate(`/user/${user?.userId}`);
  };

  useEffect(() => {
    setIsLoggedIn(token !== null);
  }, [token]);

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
        <div onClick={handleToProfile}>
          <Styled.UserImage src={user?.userImage} />
        </div>
      )}
    </Styled.NavContainer>
  );
};

export default Navigation;
