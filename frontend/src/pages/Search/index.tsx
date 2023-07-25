import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Styled from "./index.styles";
import {
  searchUsersAndPosts,
  selectSearchUsers,
  selectSearchPosts,
} from "../../store/reducers/searchSlice";
import PostsContainer from "../../Components/Post/PostsContainer";
import UserCard from "../../Components/User/UserCard";

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const users = useSelector(selectSearchUsers);
  const posts = useSelector(selectSearchPosts);
  const [activeTab, setActiveTab] = useState<"users" | "posts">("users");

  const handleTabChange = (tab: "users" | "posts") => {
    setActiveTab(tab);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const handleSearch = async () => {
      await dispatch(searchUsersAndPosts({ keyword }));
    };

    // 검색어가 변경될 때마다 검색 수행
    handleSearch();
  }, [keyword, dispatch]);

  return (
    <Styled.MainContainer>
      <Styled.SearchContainer>
        <Styled.SearchInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={keyword}
          onChange={handleInputChange}
        />
      </Styled.SearchContainer>
      <Styled.TabContainer>
        <Styled.UsersTab
          active={activeTab === "users"}
          onClick={() => handleTabChange("users")}
        />
        <Styled.PostsTab
          active={activeTab === "posts"}
          onClick={() => handleTabChange("posts")}
        />
      </Styled.TabContainer>
      {activeTab === "users" ? (
        <Styled.SearchResults>
          {users.map((user) => (
            <UserCard user={user} key={user.userId} />
          ))}
        </Styled.SearchResults>
      ) : (
        <Styled.SearchResults>
          <PostsContainer posts={posts} />
        </Styled.SearchResults>
      )}
    </Styled.MainContainer>
  );
};

export default Search;
