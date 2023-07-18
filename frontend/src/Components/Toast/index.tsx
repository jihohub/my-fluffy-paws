import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/reducers/userSlice";
import { selectAccessToken, removeAccessToken } from "../../store/reducers/tokenSlice";
import Styled from "./index.styles";
import { MdLogin, MdLogout } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";

const Toast = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const accessToken = useSelector(selectAccessToken);
  const [isToastVisible, setIsToastVisible] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(accessToken !== null);
  }, [accessToken]);

  const showToast = () => {
    setIsToastVisible(true);
  };

  const hideToast = () => {
    setIsToastVisible(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      toastContainerRef.current &&
      !toastContainerRef.current.contains(e.target as Node)
    ) {
      hideToast();
    }
  };

  const handleLogoutClick = async () => {
    await dispatch(logout());
    await dispatch(removeAccessToken());
    navigate("/");
  };

  useEffect(() => {
    if (isToastVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isToastVisible]);

  const toastContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isToastVisible && (
        <Styled.ToastContainer ref={toastContainerRef}>
          <Styled.ToastUpperSlot>
            <Styled.ToastUpperText>-</Styled.ToastUpperText>
          </Styled.ToastUpperSlot>
          {isLoggedIn ? (
            <>
              <Styled.ToastSlot onClick={handleLogoutClick}>
                <MdLogout />
                <Styled.ToastText>로그아웃</Styled.ToastText>
              </Styled.ToastSlot>
              <Styled.ToastSlot>
                <MdOutlineWatchLater />
                <Styled.ToastText>미구현</Styled.ToastText>
              </Styled.ToastSlot>
              <Styled.ToastSlot>
                <MdOutlineWatchLater />
                <Styled.ToastText>미구현</Styled.ToastText>
              </Styled.ToastSlot>
              <Styled.ToastSlot>
                <MdOutlineWatchLater />
                <Styled.ToastText>미구현</Styled.ToastText>
              </Styled.ToastSlot>
            </>
          ) : (
            <Styled.ToastLink to="/login">
              <MdLogin />
              <Styled.ToastText>로그인</Styled.ToastText>
            </Styled.ToastLink>
          )}
        </Styled.ToastContainer>
      )}
    </>
  );
};

export default Toast;
