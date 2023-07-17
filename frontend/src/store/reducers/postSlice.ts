import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { Comment } from "./commentSlice";

export interface Post {
  postId: number;
  userName: string;
  userImage: string;
  image: string;
  text: string;
  userId: number;
  commentCount: number;
  Comments: Comment[];
}

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const postAdapter = createEntityAdapter<Post>({
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
    throw Error("Failed to fetch posts");
  }
});

export const fetchPostById = createAsyncThunk(
  "post/fetchPostById",
  async (postId: number) => {
    try {
      const response = await axios.get(`/api/post/${postId}`);
      return response.data as Post;
    } catch (error) {
      throw Error("Failed to fetch post");
    }
  }
);

export const createNewPost = createAsyncThunk(
  "post/createNewPost",
  async ({ formData, token }: { formData: FormData; token: string | null }) => {
    try {
      const response = await axios.post("/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      return response.data as Post;
    } catch (error) {
      throw Error("Failed to create new post");
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ postId, text }: { postId: number; text: string }) => {
    try {
      const response = await axios.put(`/api/post/${postId}`, { text });
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
      .addCase(createNewPost.fulfilled, (state, action) => {
        postAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        postAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        postAdapter.removeOne(state, action.payload);
      });
  },
});

export const selectPostState = (state: RootState) => state.post;

// postSlice와 관련된 액션 및 리듀서 내보내기
export const { actions: postActions, reducer: postReducer } = postSlice;
export default postSlice.reducer;

export const selectPosts = createSelector(
  selectPostState,
  postAdapter.getSelectors().selectAll
);

// export const selectCommentById = createSelector(
//   [selectPosts, (_, commentId: number) => commentId],
//   (posts, commentId) => {
//     // posts 배열에서 필요한 댓글 정보를 가져와 반환합니다.
//     // 예시로는 모든 게시물의 comments 배열에서 commentId에 해당하는 댓글을 찾는 로직을 작성합니다.
//     const comment = posts
//       .flatMap((post) => post.comments)
//       .find((comment) => comment.commentId === commentId);
//     return comment;
//   }
// );

// export const selectPostById = createSelector(
//   [selectPosts, selectPostState, (_, postId: number) => postId],
//   (posts, postState, postId) => {
//     const post = posts.find((post) => post.postId === postId);
//     console.log(post);
//     if (post && post.comments) {
//       return {
//         ...post,
//         comments: post.comments.map((comment) =>
//           selectCommentById(postState, comment.commentId)
//         ),
//       };
//     }
//     return undefined;
//   }
// );

// export const selectPostById = createSelector(
//   [selectPosts, (_, postId: number) => postId],
//   (posts, postId) => {
//     return posts.find((post) => post.postId === postId);
//   }
// );

export const selectPostById = (postId: number) =>
  createSelector([selectPosts], (posts) =>
    posts.find((post) => post.postId === postId)
  ) as (state: RootState) => Post | undefined;

export const selectIsLoading = (state: RootState) => state.post.loading;
export const selectError = (state: RootState) => state.post.error;
