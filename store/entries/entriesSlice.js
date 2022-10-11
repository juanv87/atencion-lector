import { createSlice } from "@reduxjs/toolkit";

export const entriesSlice = createSlice({
  name: "entries",
  initialState: {
    isSaving: false,
    isUpdating: false,
    isLoadingPreguntas: false,
    isLoadingRespuestas: false,
    messageSaved: "",
    preguntas: [
      {
        id: "",
        titulo: "",
        createdAt: new Date().getTime(),
        validada: false,
        likes: 0,
        autor: {
          id: "",
          displayName: "",
          email: "",
          photoURL: "",
        },
        respuestas: [],
      },
    ],
    preguntasByUserName: [
      {
        id: "",
        titulo: "",
        createdAt: new Date().getTime(),
        validada: false,
        likes: 0,
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
    savingNewPregunta: (state, action) => {
      state.isSaving = true;
    },
    addNewEmptyPregunta: (state, action) => {
      state.preguntas = [...state.preguntas, action.payload];
      state.isSaving = false;
    },
    addNewRespuesta: (state, action) => {
      // console.log("addNewRespuesta", { state }, action);
      const index = state.preguntas.findIndex(
        (pregunta) => pregunta.id === action.payload.idPregunta
      );
      state.preguntas[index].respuestas.push(action.payload.newRespuesta);
      // state.preguntas[index] = { ...state.preguntas[index] };
      state.isUpdating = false;
    },
    setActivePregunta: (state, action) => {
      state.active = action.payload;
    },
    setPreguntas: (state, action) => {
      state.preguntas = action.payload;
      state.isLoadingPreguntas = false;
    },
    setPreguntasByUserName: (state, action) => {
      state.preguntasByUserName = action.payload;
      state.isLoadingPreguntas = false;
    },
    // setSavedPreguntasByUser: (state, action) => {
    //   state.savedPreguntasByUser = action.payload;
    //   // state.isLoadingPreguntas = false;
    // },
    setRespuestas: (state, action) => {
      const index = state.preguntas.findIndex(
        (pregunta) => pregunta.id === action.payload.idPregunta
      );
      state.preguntas[index].respuestas = action.payload.respuestas;
      state.isLoadingRespuestas = false;
    },
    loadingRespuestas: (state, action) => {
      state.isLoadingRespuestas = true;
    },
    loadingPreguntas: (state, action) => {
      state.isLoadingPreguntas = true;
    },
    updatingNewPregunta: (state) => {
      state.isUpdating = true;
    },
    updatePregunta: (state, action) => {
      state.isUpdating = false;
      const index = state.preguntas.findIndex(
        (pregunta) => pregunta.id === action.payload.id
      );
      state.preguntas[index] = action.payload;
    },
    clearEntriesLogout: (state) => {
      state.isSaving = false;
      state.preguntas = [];
      state.active = null;
    },

    deletePreguntaById: (state, action) => {},

    likePregunta: (state, action) => {
      const index = state.preguntas.findIndex(
        (pregunta) => pregunta.id === action.payload
      );
      state.preguntas[index].likes += 1;
    }
  },
});
export const {
  addNewEmptyPregunta,
  addNewRespuesta,
  clearEntriesLogout,
  deletePreguntaById,
  loadingPreguntas,
  loadingRespuestas,
  savingNewPregunta,
  setActivePregunta,
  setPreguntas,
  setPreguntasByUserName,
  setRespuestas,
  // setSavedPreguntasByUser,
  setSaving,
  updatePregunta,
  updatingNewPregunta,
  likePregunta
} = entriesSlice.actions;
