import { configureStore } from "@reduxjs/toolkit";
import userReducer, { selectUserState } from "./reducers/userSlice";
import postReducer, { selectPostState } from "./reducers/postSlice";
import commentReducer, { selectCommentState } from "./reducers/commentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectUser = (state: RootState) => selectUserState(state).user;
export const selectPost = (state: RootState) => selectPostState(state).posts;
export const selectComment = (state: RootState) => selectCommentState(state).comments;

export default store;
