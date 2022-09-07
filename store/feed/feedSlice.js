import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
  name: "feed",
  initialState: {
    isSaving: false,
    isUpdating: false,
    isLoadingFeed: false,
    preguntas: [
      {
        id: "",
        titulo: "",
        createdAt: new Date().getTime(),
        autor: {
          id: "",
          displayName: "",
          email: "",
          photoURL: "",
        },
        respuestas: [],
      },
    ],
  },
  reducers: {
    // Funciones que modifican el state global de la aplicacion.
    setFeed: (state, action) => {
      console.log("loadingFeed", action.payload);
      state.preguntas = action.payload;
      state.isLoadingFeed = false;
    },
    loadingFeed: (state, action) => {
      state.isLoadingFeed = true;
    },
  },
});
export const { setFeed, loadingFeed } = feedSlice.actions;
