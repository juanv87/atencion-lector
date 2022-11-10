import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { entriesSlice } from "./entries";
import { tweetsSlice } from "./tweets/tweetsSlice";
import { savedByUserSlice } from "./savedByUser/savedByUserSlice";
import { likedByUser } from "./likedByUser/likedByUser";
import { userMessages } from "./userMessages/userMessagesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    entries: entriesSlice.reducer,
    tweets: tweetsSlice.reducer,
    savedByUser: savedByUserSlice.reducer,
    likedByUser: likedByUser.reducer,
    userMessages: userMessages.reducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
