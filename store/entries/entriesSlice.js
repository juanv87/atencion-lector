import { createSlice } from "@reduxjs/toolkit";

export const entriesSlice = createSlice({
  name: "entries",
  initialState: {
    isSaving: false,
    isUpdating: false,
    isLoadingRespuestas: false,
    messageSaved: "",
    preguntas: [
      {
        id: "",
        titulo: "",
        autor: "",
        createdAt: new Date().getTime(),
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
      state.preguntas.push(action.payload);
      state.isSaving = false;
    },
    addNewRespuesta: (state, action) => {
      console.log("addNewRespuesta", { state }, action);
      const index = state.preguntas.findIndex(
        (pregunta) => pregunta.id === action.payload.idPregunta
      );
      state.preguntas[index].respuestas.push(action.payload.newRespuesta);
      state.isUpdating = false;
    },
    setActivePregunta: (state, action) => {
      state.active = action.payload;
    },
    setPreguntas: (state, action) => {
      state.preguntas = action.payload;
    },
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
    setSaving: (state, action) => {},
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
    deletePreguntaById: (state, action) => {},
  },
});
export const {
  addNewEmptyPregunta,
  addNewRespuesta,
  deletePreguntaById,
  loadingRespuestas,
  savingNewPregunta,
  setActivePregunta,
  setPreguntas,
  setRespuestas,
  setSaving,
  updatePregunta,
  updatingNewPregunta,
} = entriesSlice.actions;
