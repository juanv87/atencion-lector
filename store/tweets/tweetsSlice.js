import { createSlice } from "@reduxjs/toolkit";

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState: {
    isSaving: false,
    isUpdating: false,
    isLoadingTweets: false,
    messageSaved: "",
    tweets: [
      {
        id: "",
        body: "",
        createdAt: new Date().getTime(),
        validada: false,
        autor: {
          id: "",
          displayName: "",
          email: "",
          photoURL: "",
        },
      },
    ],
    tweetsByUserName: [
      {
        id: "",
        body: "",
        createdAt: new Date().getTime(),
        validada: false,
        autor: {
          id: "",
          displayName: "",
          email: "",
          photoURL: "",
        },
      },
    ],

    active: null,
  },
  reducers: {
    setUpdateBody: (state, action) => {
      const indexTweet = state.tweets.findIndex(
        (tweet) => tweet.id === action.payload.id
      );
      state.tweets[indexTweet].body = action.payload.updatedTitle;
    },
    savingNewTweet: (state, action) => {
      state.isSaving = true;
    },
    addNewEmptyTweet: (state, action) => {
      state.tweets = [...state.tweets, action.payload];
      state.isSaving = false;
    },
    setTweets: (state, action) => {
      state.tweets = action.payload;
      state.isLoadingTweets = false;
    },
    setTweetsByUserName: (state, action) => {
      state.tweetsByUserName = action.payload;
      state.isLoadingTweets = false;
    },
    loadingTweets: (state, action) => {
      state.isLoadingTweets = true;
    },
    updatingNewTweet: (state) => {
      state.isUpdating = true;
    },
    updateTweet: (state, action) => {
      state.isUpdating = false;
      const index = state.tweets.findIndex(
        (tweets) => tweets.id === action.payload.id
      );
      state.tweets[index] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyTweet,
  loadingTweets,
  savingNewTweet,
  setTweets,
  setTweetsByUserName,
  updateTweet,
  updatingNewTweet,
  setUpdateBody,
  // setValidarFromPreguntasByUserName,
} = tweetsSlice.actions;
