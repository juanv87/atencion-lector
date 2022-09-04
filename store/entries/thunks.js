import { collection, doc, setDoc } from "firebase/firestore/lite";
import { loadPreguntas } from "../../helpers/loadPreguntas";
import { loadRespuestasById } from "../../helpers/loadRespuestasById";
import { FirebaseDB } from "../../lib/firebase/firebase";
import {
  addNewEmptyPregunta,
  savingNewPregunta,
  setActivePregunta,
  setPreguntas,
  setRespuestas,
  updatePregunta,
  updatingNewPregunta,
} from "./entriesSlice";

// Funciones asincronas que modifican el state global de la aplicacion.

export const startNewPregunta = ({ titlePregunta }) => {
  return async (dispatch, getState) => {
    dispatch(savingNewPregunta());
    const { uid } = getState().auth;
    const newDoc = doc(collection(FirebaseDB, `${uid}/entradas/preguntas`));
    const newPregunta = {
      id: newDoc.id,
      titulo: titlePregunta,
      fecha: "",
      autor: "",
      respuestas: "",
      createdAt: new Date().getTime(),
    };
    await setDoc(newDoc, newPregunta);

    dispatch(addNewEmptyPregunta(newPregunta));
    dispatch(setActivePregunta(newPregunta));
  };
};

export const startNewRespuesta = ({ titleRespuesta, id }) => {
  return async (dispatch, getState) => {
    dispatch(updatingNewPregunta());
    const { uid } = getState().auth;
    const newDoc = doc(
      collection(FirebaseDB, `${uid}/entradas/preguntas/${id}/respuestas`)
    );
    await setDoc(newDoc, { titleRespuesta });
    dispatch(updatePregunta(titleRespuesta));
  };
};

export const startLoadingPreguntas = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("No hay usuario logueado");
    const preguntas = await loadPreguntas(uid);
    dispatch(setPreguntas(preguntas));
  };
};

export const startLoadingRespuestas = (id) => {
  console.log("startLoadingRespuestas", id);
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("No hay usuario logueado");
    const respuestas = await loadRespuestasById({ uid, id });
    dispatch(setRespuestas(respuestas));
  };
};
