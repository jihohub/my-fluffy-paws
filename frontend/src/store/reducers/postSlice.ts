import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
  EntityAdapter,
  AsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface Post {
  postId: number;
  User: {
    userId: number;
    userName: string;
    userImage: string;
  };
  image: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  commentCount: number;
  likeCount: number;
  likedUser: {
    userId: number;
    User: {
      userId: number;
      userName: string;
      userImage: string;
    };
  }[];
}

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export interface CreatePostPayload {
  formData: FormData;
  token: string | null;
}

export interface UpdatePostPayload {
  postId: number;
  text: string;
  token: string | null;
}

export interface DeletePostPayload {
  postId: number;
  token: string | null;
}

interface CreateNewPostResponse {
  message: string;
  post: Post;
}

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId: (post) => post.postId,
});

const initialState: PostState = {
  posts: [],
  loading: false,
  error: "",
};

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  try {
    const response = await axios.get("/api/post");
    return response.data as Post[];
  } catch (error) {
    throw Error("게시물 조회에 실패하였습니다.");
  }
});

export const fetchPostById = createAsyncThunk(
  "post/fetchPostById",
  async (postId: number) => {
    try {
      const response = await axios.get(`/api/post/${postId}`);
      return response.data as Post;
    } catch (error) {
      throw Error("게시물 조회에 실패하였습니다.");
    }
  }
);

export const createNewPost: AsyncThunk<
  CreateNewPostResponse,
  CreatePostPayload,
  {}
> = createAsyncThunk(
  "post/createNewPost",
  async (payload: CreatePostPayload) => {
    try {
      const { formData, token } = payload;
      const response = await axios.post("/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data as CreateNewPostResponse;
    } catch (error) {
      throw Error("게시물 작성에 실패하였습니다.");
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (payload: UpdatePostPayload) => {
    try {
      const { postId, text, token } = payload;
      const response = await axios.put(
        `/api/post/${postId}`,
        { text },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      return response.data as Post;
    } catch (error) {
      throw Error("게시물 수정에 실패하였습니다.");
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (payload: DeletePostPayload) => {
    try {
      const { postId, token } = payload;
      await axios.delete(`/api/post/${postId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return postId;
    } catch (error) {
      throw Error("게시물 삭제에 실패하였습니다.");
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: postAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        postAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        postAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(createNewPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.loading = false;
        postAdapter.addOne(state, action.payload.post);
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload;
        const existingPost = state.entities[updatedPost.postId];
        if (existingPost) {
          existingPost.text = updatedPost.text;
          existingPost.updatedAt = updatedPost.updatedAt;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        postAdapter.removeOne(state, action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      });
  },
});

// 게시물과 관련된 상태 선택자들
export const selectPostState = (state: RootState) => state.post;
export const selectPosts = createSelector(
  selectPostState,
  postAdapter.getSelectors().selectAll
);

export const selectPostById = (postId: number) =>
  createSelector([selectPosts], (posts) =>
    posts.find((post) => post.postId === postId)
  ) as (state: RootState) => Post | undefined;

export const selectIsLoading = (state: RootState) => state.post.loading;
export const selectError = (state: RootState) => state.post.error;

// postSlice와 관련된 액션 및 리듀서 내보내기
export const { actions: postActions, reducer: postReducer } = postSlice;
export default postSlice.reducer;
