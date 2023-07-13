import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface Post {
  postId: number;
  userName: string;
  userProfile: string;
  picture: string;
  content: string;
  userId: number;
  commentCount: number;
}

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: "",
};

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  try {
    const response = await axios.get("/api/post");
    console.log(response);
    return response.data as Post[];
  } catch (error) {
    throw Error("Failed to fetch posts");
  }
});

export const createNewPost = createAsyncThunk(
  "post/createNewPost",
  async (postData: Partial<Post>) => {
    try {
      const response = await axios.post("/api/post", postData);
      return response.data as Post;
    } catch (error) {
      throw Error("Failed to create new post");
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ postId, content }: { postId: number; content: string }) => {
    try {
      const response = await axios.put(`/api/post/${postId}`, { content });
      return response.data as Post;
    } catch (error) {
      throw Error("Failed to update post");
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId: number) => {
    try {
      await axios.delete(`/api/post/${postId}`);
      return postId;
    } catch (error) {
      throw Error("Failed to delete post");
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const existingPostIndex = state.posts.findIndex(
          (post) => post.postId === updatedPost.postId
        );
        if (existingPostIndex !== -1) {
          state.posts[existingPostIndex] = updatedPost;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const deletedPostId = action.payload;
        state.posts = state.posts.filter(
          (post) => post.postId !== deletedPostId
        );
      });
  },
});

export const selectPostState = (state: RootState) => state.post;

// postSlice와 관련된 액션 및 리듀서 내보내기
export const { actions: postActions, reducer: postReducer } = postSlice;
export default postSlice.reducer;

export const selectPosts = (state: RootState) => state.post.posts;
export const selectIsLoading = (state: RootState) => state.post.loading;
export const selectError = (state: RootState) => state.post.error;
