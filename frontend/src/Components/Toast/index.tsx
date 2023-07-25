import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchPostById, deletePost } from "../../store/reducers/postSlice";
import { logout } from "../../store/reducers/userSlice";
import { fetchComments , deleteComment } from "../../store/reducers/commentSlice";
import { selectAccessToken, removeAccessToken } from "../../store/reducers/tokenSlice";
import Styled from "./index.styles";
import {
  MdLogout,
  MdEdit,
  MdDelete,
} from "react-icons/md";

interface ToastProps {
  toastProps: {
    path: string;
    postId?: number;
    commentId?: number;
  }
}

const Toast: React.FC<ToastProps> = ({ toastProps }) => {
  const { path, postId, commentId } = toastProps;
  const navigate = useNavigate();
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

  const handleEditPost = async () => {
    navigate(`/post/${postId}/edit`);
  };

  const handleDeletePost = async () => {
    postId && (await dispatch(deletePost({ postId, token: accessToken })));
  };

  const handleDeleteComment = async () => {
    (postId && commentId) &&
      (await dispatch(
        deleteComment({ commentId, token: accessToken })
      ));
    postId && (await dispatch(fetchPostById(postId)));
    postId && (await dispatch(fetchComments(postId)));
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
          {path === "user" && (
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
          {path === "post" && (
            <>
              <Styled.ToastSlot onClick={handleEditPost}>
                <MdEdit />
                <Styled.ToastText>게시물 수정</Styled.ToastText>
              </Styled.ToastSlot>
              <Styled.ToastSlot onClick={handleDeletePost}>
                <MdDelete />
                <Styled.ToastText>게시물 삭제</Styled.ToastText>
              </Styled.ToastSlot>
            </>
          )}
          {path === "comment" && (
            <>
              <Styled.ToastSlot onClick={handleDeleteComment}>
                <MdDelete />
                <Styled.ToastText>댓글 삭제</Styled.ToastText>
              </Styled.ToastSlot>
            </>
          )}
        </Styled.ToastContainer>
      )}
    </>
  );
};

export default Toast;
