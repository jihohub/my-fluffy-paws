import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/reducers/userSlice";
import Styled from "./index.styles";
import { MdLogout } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";

const Toast = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [isToastVisible, setIsToastVisible] = useState(false);

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
      <Styled.ToastButton onClick={showToast}>Show Toast</Styled.ToastButton>
      {isToastVisible && (
        <Styled.ToastContainer ref={toastContainerRef}>
          <Styled.ToastUpperSlot>
            <Styled.ToastUpperText>-</Styled.ToastUpperText>
          </Styled.ToastUpperSlot>
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
        </Styled.ToastContainer>
      )}
    </>
  );
};

export default Toast;
