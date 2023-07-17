import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./Components/Header";
import Navigation from "./Components/Navigation";
import Home from "./pages/Home";
import User from "./pages/User";
import Post from "./pages/Post";
import PostForm from "./pages/PostForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import FloatingButton from "./Components/FloatingButton";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user/:userId" element={<User />} />
        <Route path="post/:postId" element={<Post />} />
        <Route path="post/new" element={<PostForm />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
      {/* <FloatingButton /> */}
    </BrowserRouter>
  );
};

export default App;
