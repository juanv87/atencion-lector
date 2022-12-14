import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    uid: null || '',
    email: null,
    admin: false,
    displayName: null,
    nickName: null,
    photoURL: null,
    errorMessage: null,
    preguntasGuardadas: [],
    preguntasLikeadas: [],
    mensajes: [],
    aboutMe: ""
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.uid = payload.uid;
      state.email = payload.email;
      state.admin = payload.admin;
      state.displayName = payload.displayName;
      state.nickName = payload.nickName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
      state.preguntasGuardadas = payload.preguntasGuardadas;
      state.preguntasLikeadas = payload.preguntasLikeadas;
      state.mensajes = payload.mensajes;
      state.aboutMe = payload.aboutMe;
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
      state.mensajes = [];
      state.aboutMe = "";
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    setAboutMe: (state, { payload }) => {      
      state.aboutMe = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials, setAboutMe } = authSlice.actions;
