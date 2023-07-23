import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer, { selectUserState } from "./reducers/userSlice";
import postReducer, { selectPostState } from "./reducers/postSlice";
import commentReducer, { selectCommentState } from "./reducers/commentSlice";
import tokenReducer, { selectTokenState } from "./reducers/tokenSlice";
import likeReducer from "./reducers/likeSlice";
import followReducer, { selectFollowState } from "./reducers/followSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  token: tokenReducer,
  like: likeReducer,
  follow: followReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectUser = (state: RootState) => selectUserState(state).user;
export const selectPost = (state: RootState) => selectPostState(state).posts;
export const selectComment = (state: RootState) => selectCommentState(state).comments;
export const selectAccessToken = (state: RootState) => selectTokenState(state).accessToken;
export const selectFollowers = (state: RootState) =>
  selectFollowState(state).followers;
export const selectFollowings = (state: RootState) =>
  selectFollowState(state).followings;

export const persistor = persistStore(store);
export default store;

// persistor.purge();
