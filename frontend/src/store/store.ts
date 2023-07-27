import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userSlice";
import postReducer from "./reducers/postSlice";
import commentReducer from "./reducers/commentSlice";
import tokenReducer from "./reducers/tokenSlice";
import likeReducer from "./reducers/likeSlice";
import followReducer from "./reducers/followSlice";
import searchReducer from "./reducers/searchSlice";
import chatReducer from "./reducers/chatSlice";

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
  search: searchReducer,
  chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;

// persistor.purge();
