import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { Post } from "./postSlice";

export interface User {
  userId: number;
  email: string;
  userName: string;
  userImage: string;
  posts: Post[];
}

export interface UserState {
  user: User | null;
  otherUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  otherUser: null,
  loading: false,
  error: "",
};

export const signup = createAsyncThunk(
  "user/signup",
  async (formData: FormData) => {
    try {
      const response = await axios.post("/api/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw Error("Failed to sign up");
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post("/api/user/login", userData);

      return response.data;
    } catch (error) {
      throw Error("Failed to log in");
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  return;
});

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (userId: number) => {
    try {
      const response = await axios.get(`/api/user/${userId}`);
      return response.data;
    } catch (error) {
      throw Error("Failed to get user info");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.otherUser = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      });
  },
});

// 유저와 관련된 상태 선택자들
export const selectUserState = (state: RootState) => state.user;
export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;

// userSlice와 관련된 액션 및 리듀서 내보내기
export const { actions: userActions, reducer: userReducer } = userSlice;
export default userSlice.reducer;
