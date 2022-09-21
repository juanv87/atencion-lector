import { createSlice } from "@reduxjs/toolkit";

export const savedByUserSlice = createSlice({
  name: "savedByUser",
  initialState: {
    isSaving: false,
    updatedSaved: false, // Para re renderizar componente ListaSaved...
    isLoadingPreguntas: false,
    isLoadingSaved: false,
    messageSaved: "",    
    savedPreguntasByUser: [
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
    active: null,
  },
  reducers: {
    // Funciones que modifican el state global de la aplicacion.
    
    setSavedPreguntasByUser: (state, action) => {
      state.savedPreguntasByUser = action.payload;
      // state.isLoadingPreguntas = false;
    },
    setUpdatedSaved: (state, action) => {
      state.updatedSaved = action.payload;
    },
    
  },
});
export const {
  
  setSavedPreguntasByUser,
  setUpdatedSaved
  
} = savedByUserSlice.actions;