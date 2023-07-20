import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface LikeState {
  loading: boolean;
  error: string | null;
}

const initialState: LikeState = {
  loading: false,
  error: null,
};

export const likePost = createAsyncThunk(
  "like/likePost",
  async (postId: number) => {
    try {
      await axios.post(`/api/like/post/${postId}`);
    } catch (error) {
      throw Error("Failed to like the post");
    }
  }
);

export const unlikePost = createAsyncThunk(
  "like/unlikePost",
  async (postId: number) => {
    try {
      await axios.delete(`/api/like/post/${postId}`);
    } catch (error) {
      throw Error("Failed to unlike the post");
    }
  }
);

export const likeComment = createAsyncThunk(
  "like/likeComment",
  async (commentId: number) => {
    try {
      await axios.post(`/api/like/comment/${commentId}`);
    } catch (error) {
      throw Error("Failed to like the comment");
    }
  }
);

export const unlikeComment = createAsyncThunk(
  "like/unlikeComment",
  async (commentId: number) => {
    try {
      await axios.delete(`/api/like/comment/${commentId}`);
    } catch (error) {
      throw Error("Failed to unlike the comment");
    }
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(unlikePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlikePost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(likeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(unlikeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlikeComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(unlikeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      });
  },
});

// Like와 관련된 상태 선택자들
export const selectLoading = (state: RootState) => state.like.loading;
export const selectError = (state: RootState) => state.like.error;

// likeSlice와 관련된 액션 및 리듀서 내보내기
export const { reducer: likeReducer } = likeSlice;
export default likeSlice.reducer;
