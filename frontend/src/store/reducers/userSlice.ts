import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface User {
  userId: number;
  email: string;
  password: string;
  userName: string;
  userProfile: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: "",
};

export const signup = createAsyncThunk(
  "user/signup",
  async (userData: Partial<User>) => {
    try {
      const response = await axios.post("/api/user/signup", userData);
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

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  try {
    const response = await axios.get("/api/user/getinfo");
    return response.data;
  } catch (error) {
    throw Error("Failed to get user info");
  }
});

export const getUserPosts = createAsyncThunk("user/getUserPosts", async () => {
  try {
    const response = await axios.get("/api/user/posts");
    return response.data;
  } catch (error) {
    throw Error("Failed to get user posts");
  }
});

export const getUserComments = createAsyncThunk(
  "user/getUserComments",
  async () => {
    try {
      const response = await axios.get("/api/user/comments");
      return response.data;
    } catch (error) {
      throw Error("Failed to get user comments");
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
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        // Update the user's posts in the state
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(getUserComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserComments.fulfilled, (state, action) => {
        state.loading = false;
        // Update the user's comments in the state
      })
      .addCase(getUserComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      });
  },
});

export const selectUserState = (state: RootState) => state.user;

// userSlice와 관련된 액션 및 리듀서 내보내기
export const { actions: userActions, reducer: userReducer } = userSlice;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;
