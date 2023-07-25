import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { User } from "./userSlice";
import { Post } from "./postSlice";

export interface SearchState {
  users: User[];
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export interface SearchPayload {
  keyword: string;
}

export const searchAdapter = createEntityAdapter<User>({
  selectId: (user) => user.userId,
});

const initialState: SearchState = {
  users: [],
  posts: [],
  loading: false,
  error: null,
};

export const searchUsersAndPosts = createAsyncThunk(
  "search/searchUsersAndPosts",
  async (payload: SearchPayload) => {
    try {
      const { keyword } = payload;
      const response = await axios.get(`/api/search?keyword=${keyword}`);
      return response.data;
    } catch (error) {
      throw Error("유저 및 게시물 검색에 실패하였습니다.");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: searchAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUsersAndPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsersAndPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.posts = action.payload.posts;
      })
      .addCase(searchUsersAndPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      });
  },
});

// 검색 상태를 위한 선택자들
export const selectSearchState = (state: RootState) => state.search;
export const selectSearchUsers = (state: RootState) => state.search.users;
export const selectSearchPosts = (state: RootState) => state.search.posts;
export const selectIsLoading = (state: RootState) => state.search.loading;
export const selectError = (state: RootState) => state.search.error;

// searchSlice의 액션과 리듀서 내보내기
export const { actions: searchActions, reducer: searchReducer } = searchSlice;
export default searchSlice.reducer;
