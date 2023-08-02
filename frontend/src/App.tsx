import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Navigation from "./Components/Navigation";
import Home from "./pages/Home";
import User from "./pages/User";
import Post from "./pages/Post";
import PostForm from "./pages/PostForm";
import EditForm from "./pages/EditForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import ChatRoom from "./pages/ChatRoom";
import Search from "./pages/Search";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  refreshAccessToken,
  selectAccessToken,
  selectRefreshToken,
} from "./store/reducers/tokenSlice";
import { logout, selectUser } from "./store/reducers/userSlice";
import { parseJwtExpiration } from "./utils/parseJwtExpiration";

const App: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);

  // 앱이 로드되거나 토큰이 변경될 때마다 액세스 토큰과 리프레시 토큰 확인 및 재발급
  useEffect(() => {
    // 액세스 토큰이 있을 때만 확인
    if (accessToken) {
      // 토큰의 만료 시간을 가져옴
      const accessTokenExp = parseJwtExpiration(accessToken);

      // 액세스 토큰이 만료되면 리프레시 토큰을 사용해 재발급
      if (accessTokenExp && accessTokenExp < Date.now() / 1000) {
        // 리프레시 토큰이 없을 경우 로그아웃
        if (!refreshToken) {
          dispatch(logout());
          return;
        }

        // 리프레시 토큰이 있을 경우 액세스 토큰 재발급
        dispatch(refreshAccessToken(refreshToken));
      }
    } else {
      // 액세스 토큰이 없는 경우 로그아웃
      dispatch(logout());
    }
  }, [accessToken, refreshToken, dispatch]);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user/:userId" element={<User />} />
        <Route path="post/:postId" element={<Post />} />
        <Route path="post/new" element={<PostForm />} />
        <Route path="post/:postId/edit" element={<EditForm />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="chat" element={<Chat />} />
        <Route path="chat/:roomId" element={<ChatRoom />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
