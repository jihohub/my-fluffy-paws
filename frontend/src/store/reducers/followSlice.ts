import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface Follower {
  followerId: number;
  followingId: number;
}

export interface FollowState {
  followers: Follower[];
  followings: Follower[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowState = {
  followers: [],
  followings: [],
  loading: false,
  error: null,
};

export const fetchFollowers = createAsyncThunk(
  "follow/fetchFollowers",
  async (userId: number) => {
    try {
      const response = await axios.get(`/api/followers/${userId}`);
      return response.data as Follower[];
    } catch (error) {
      throw Error("Failed to fetch followers");
    }
  }
);

export const fetchFollowings = createAsyncThunk(
  "follow/fetchFollowings",
  async (userId: number) => {
    try {
      const response = await axios.get(`/api/followings/${userId}`);
      return response.data as Follower[];
    } catch (error) {
      throw Error("Failed to fetch followings");
    }
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(fetchFollowings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowings.fulfilled, (state, action) => {
        state.loading = false;
        state.followings = action.payload;
      })
      .addCase(fetchFollowings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      });
  },
});

// 팔로워와 관련된 상태 선택자들
export const selectFollowState = (state: RootState) => state.follow;
export const selectFollowers = createSelector(
  selectFollowState,
  (follow) => follow.followers
);
export const selectFollowings = createSelector(
  selectFollowState,
  (follow) => follow.followings
);
export const selectIsLoading = (state: RootState) => state.follow.loading;
export const selectError = (state: RootState) => state.follow.error;

// followSlice와 관련된 액션 및 리듀서 내보내기
export const { actions: followActions, reducer: followReducer } = followSlice;
export default followSlice.reducer;
