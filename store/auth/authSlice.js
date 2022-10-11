import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    uid: null,
    email: null,
    displayName: null,
    nickName: null,
    photoURL: null,
    errorMessage: null,
    preguntasGuardadas: [],
    preguntasLikeadas: [],
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.nickName = payload.nickName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
      state.preguntasGuardadas = payload.preguntasGuardadas;
      state.preguntasLikeadas = payload.preguntasLikeadas;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.nickName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;
      state.preguntasGuardadas = [];
      state.preguntasLikeadas = [];
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
