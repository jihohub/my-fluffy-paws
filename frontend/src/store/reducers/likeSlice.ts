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

export interface PostPayload {
  postId: number;
  token: string | null;
}

export interface CommentPayload {
  commentId: number;
  token: string | null;
}

export const likePost = createAsyncThunk(
  "like/likePost",
  async (payload: PostPayload) => {
    try {
      const { postId, token } = payload;
      await axios.post(`/api/like/post/${postId}`, {}, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw Error("게시물 좋아요에 실패하였습니다.");
    }
  }
);

export const unlikePost = createAsyncThunk(
  "like/unlikePost",
  async (payload: PostPayload) => {
    try {
      const { postId, token } = payload;
      await axios.delete(`/api/like/post/${postId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw Error("게시물 좋아요 취소에 실패하였습니다.");
    }
  }
);

export const likeComment = createAsyncThunk(
  "like/likeComment",
  async (payload: CommentPayload) => {
    try {
      const { commentId, token } = payload;
      await axios.post(
        `/api/like/comment/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      throw Error("댓글 좋아요에 실패하였습니다.");
    }
  }
);

export const unlikeComment = createAsyncThunk(
  "like/unlikeComment",
  async (payload: CommentPayload) => {
    try {
      const { commentId, token } = payload;
      await axios.delete(`/api/like/comment/${commentId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw Error("댓글 좋아요 취소에 실패하였습니다.");
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
