import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../store";
import { Post } from "./postSlice";

export interface User {
  userId: number;
  email: string;
  userName: string;
  userImage: string;
  posts: Post[];
  followings: {
    followingId: number;
    following: {
      userId: number;
      userName: string;
      userImage: string;
    };
  }[];
  followers: {
    followerId: number;
    follower: {
      userId: number;
      userName: string;
      userImage: string;
    };
  }[];
}

export interface UserState {
  user: User | null;
  userOnProfile: User | null;
  usersLikePost: User[] | null;
  isUserNameDuplicate: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  userOnProfile: null,
  usersLikePost: null,
  isUserNameDuplicate: false,
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
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any, any>;
        const errorMessage =
          axiosError?.response?.data?.error ||
          "회원가입에 실패하였습니다.";
        throw new Error(errorMessage);
      }
      throw error;
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
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<UserState, any>;
        const errorMessage =
          axiosError?.response?.data?.error ||
          "로그인에 실패하였습니다.";
        throw new Error(errorMessage);
      }
      throw error;
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  return;
});

export const getLoggedinUserInfo = createAsyncThunk(
  "user/getLoggedinUserInfo",
  async (userId: number) => {
    try {
      const response = await axios.get(`/api/user/${userId}`);

      return response.data;
    } catch (error) {
      throw Error("유저정보 조회에 실패하였습니다.");
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (userId: number) => {
    try {
      const response = await axios.get(`/api/user/${userId}`);

      return response.data;
    } catch (error) {
      throw Error("유저정보 조회에 실패하였습니다.");
    }
  }
);

export const getUsersInfoBatch = createAsyncThunk(
  "user/getUsersInfoBatch",
  async (userIds: number[]) => {
    try {
      const response = await axios.post("/api/user/batch", { userIds });

      return response.data;
    } catch (error) {
      throw new Error("유저정보 조회에 실패하였습니다.");
    }
  }
);

export const checkDuplicateUserName = createAsyncThunk(
  "user/checkDuplicateUserName",
  async (userName: string) => {
    try {
      const response = await axios.post("/api/user/checkname", {
        userName,
      });

      // 서버로부터 받은 응답에 따라 중복 여부를 판단하여 상태값 반환
      return response.data;
    } catch (error) {
      throw new Error("닉네임 중복 체크에 실패하였습니다.");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null; // 에러를 초기화하는 액션
    },
  },
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
      .addCase(getLoggedinUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoggedinUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getLoggedinUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userOnProfile = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(getUsersInfoBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersInfoBatch.fulfilled, (state, action) => {
        state.loading = false;
        state.usersLikePost = action.payload;
      })
      .addCase(getUsersInfoBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(checkDuplicateUserName.fulfilled, (state, action) => {
        state.isUserNameDuplicate = false;
      })
      .addCase(checkDuplicateUserName.rejected, (state, action) => {
        state.isUserNameDuplicate = true;
      });
  },
});

// 유저와 관련된 상태 선택자들
export const selectUserState = (state: RootState) => state.user;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserOnProfile = (state: RootState) => state.user.userOnProfile;
export const selectUsersLikePost = (state: RootState) =>
  state.user.usersLikePost;
export const selectIsUserNameDuplicate = (state: RootState) =>
  state.user.isUserNameDuplicate;
export const selectIsLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;

// userSlice와 관련된 액션 및 리듀서 내보내기
export const { actions: userActions, reducer: userReducer } = userSlice;
export default userSlice.reducer;
