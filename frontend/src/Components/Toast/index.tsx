import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { deletePost } from "../../store/reducers/postSlice";
import { logout } from "../../store/reducers/userSlice";
import { selectAccessToken, removeAccessToken } from "../../store/reducers/tokenSlice";
import Styled from "./index.styles";
import {
  MdLogin,
  MdLogout,
  MdOutlineWatchLater,
  MdEdit,
  MdDelete,
} from "react-icons/md";

const Toast: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUserRoute = location.pathname.startsWith("/user/");
  const isPostRoute = location.pathname.startsWith("/post/");
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const accessToken = useSelector(selectAccessToken);
  const [isToastVisible, setIsToastVisible] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(accessToken !== null);
  }, [accessToken]);

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

  const handleEditPostClick = async () => {
    navigate(`/post/${postId}/edit`);
  };

  const handleDeletePostClick = async () => {
    postId && await dispatch(deletePost(parseInt(postId)));
    navigate("/");
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
          {isUserRoute && (
            <>
              <Styled.ToastSlot onClick={handleLogoutClick}>
                <MdEdit />
                <Styled.ToastText>회원정보 수정</Styled.ToastText>
              </Styled.ToastSlot>
              <Styled.ToastSlot onClick={handleLogoutClick}>
                <MdLogout />
                <Styled.ToastText>로그아웃</Styled.ToastText>
              </Styled.ToastSlot>
            </>
          )}
          {isPostRoute && (
            <>
              <Styled.ToastSlot onClick={handleEditPostClick}>
                <MdEdit />
                <Styled.ToastText>게시물 수정</Styled.ToastText>
              </Styled.ToastSlot>
              <Styled.ToastSlot onClick={handleDeletePostClick}>
                <MdDelete />
                <Styled.ToastText>게시물 삭제</Styled.ToastText>
              </Styled.ToastSlot>
            </>
          )}
        </Styled.ToastContainer>
      )}
    </>
  );
};

export default Toast;
