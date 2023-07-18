import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TokenState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// 액세스 토큰과 리프레시 토큰 발급을 위한 비동기 Thunk 액션 생성자
export const issueAccessToken = createAsyncThunk(
  "token/issue",
  async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post("/api/token/issue", userData);
      return response.data;
    } catch (error) {
      throw Error("액세스 토큰을 발급하는데 실패하였습니다.");
    }
  }
);

// 액세스 토큰 갱신을 위한 비동기 Thunk 액션 생성자
export const refreshAccessToken = createAsyncThunk(
  "token/refresh",
  async (refreshToken: string) => {
    try {
      const response = await axios.post("/api/token/refresh", { refreshToken });
      return response.data.accessToken;
    } catch (error) {
      throw Error("액세스 토큰을 갱신하는데 실패하였습니다.");
    }
  }
);

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(issueAccessToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(issueAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(issueAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      });
  },
});

// 액세스 토큰과 관련된 상태 선택자들
export const selectTokenState = (state: RootState) => state.token;
export const selectAccessToken = (state: RootState) => state.token.accessToken;
export const selectRefreshToken = (state: RootState) =>
  state.token.refreshToken;
export const selectTokenLoading = (state: RootState) => state.token.loading;
export const selectTokenError = (state: RootState) => state.token.error;

// tokenSlice와 관련된 액션 및 리듀서 내보내기
export const { actions: tokenActions, reducer: tokenReducer } = tokenSlice;
export default tokenSlice.reducer;
