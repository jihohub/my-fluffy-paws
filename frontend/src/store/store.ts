import { configureStore } from "@reduxjs/toolkit";
import postReducer, { selectPostState } from "./reducers/postSlice";
import userReducer, { selectUserState } from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectPost = (state: RootState) => selectPostState(state).posts;
export const selectUser = (state: RootState) => selectUserState(state).user;

export default store;
