import { createSlice } from "@reduxjs/toolkit";

export const entriesSlice = createSlice({
  name: "entries",
  initialState: {
    isSaving: false,
    isUpdating: false,
    messageSaved: "",
    preguntas: [],
    respuestas: [],
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
    setActivePregunta: (state, action) => {
      state.active = action.payload;
    },
    setPreguntas: (state, action) => {
      state.preguntas = action.payload;
    },
    setRespuestas: (state, action) => {
      state.respuestas = action.payload;
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
  deletePreguntaById,
  savingNewPregunta,
  setActivePregunta,
  setPreguntas,
  setRespuestas,
  setSaving,
  updatePregunta,
  updatingNewPregunta,
} = entriesSlice.actions;
