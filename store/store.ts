import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { entriesSlice } from "./entries";
import { savedByUserSlice } from './savedByUser/savedByUserSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    entries: entriesSlice.reducer,
    savedByUser: savedByUserSlice.reducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
