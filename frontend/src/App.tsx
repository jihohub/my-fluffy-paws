import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./Components/Header";
import Home from "./pages/Home";
import Post from "./pages/Post/indes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="post/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
