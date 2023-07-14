import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  content: string;
  User: {
    userName: string;
    userImage: string;
  };
}

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (postId: number) => {
    try {
      const response = await axios.get(`/api/comment?postId=${postId}`);
      return response.data as Comment[];
    } catch (error) {
      throw Error("Failed to fetch comments");
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (commentData: Partial<Comment>) => {
    try {
      const response = await axios.post("/api/comment", commentData);
      return response.data as Comment;
    } catch (error) {
      throw Error("Failed to create comment");
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (commentData: Comment) => {
    try {
      const response = await axios.put(
        `/api/comment/${commentData.commentId}`,
        commentData
      );
      return response.data as Comment;
    } catch (error) {
      throw Error("Failed to update comment");
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId: number) => {
    try {
      await axios.delete(`/api/comment/${commentId}`);
      return commentId;
    } catch (error) {
      throw Error("Failed to delete comment");
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedComment = action.payload;
        const index = state.comments.findIndex(
          (comment) => comment.commentId === updatedComment.commentId
        );
        if (index !== -1) {
          state.comments[index] = updatedComment;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        const deletedCommentId = action.payload;
        state.comments = state.comments.filter(
          (comment) => comment.commentId !== deletedCommentId
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      });
  },
});

export const selectCommentState = (state: RootState) => state.comment;
export const selectComments = (state: RootState) => state.comment.comments;
export const selectLoading = (state: RootState) => state.comment.loading;
export const selectError = (state: RootState) => state.comment.error;

// commentSlice와 관련된 액션 및 리듀서 내보내기
export const { actions: commentActions, reducer: commentReducer } =
  commentSlice;
export default commentSlice.reducer;
