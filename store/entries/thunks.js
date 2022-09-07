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
  loadingRespuestas,
  addNewRespuesta,
  updatingNewPregunta,
} from "./entriesSlice";

// Funciones asincronas que modifican el state global de la aplicacion.

export const startNewPregunta = ({ titlePregunta }) => {
  return async (dispatch, getState) => {
    dispatch(savingNewPregunta());
    const { uid, displayName, email, photoURL } = getState().auth;
    const newDoc = doc(collection(FirebaseDB, `${uid}/entradas/preguntas`));
    const newPregunta = {
      id: newDoc.id,
      titulo: titlePregunta,
      autor: {
        id: uid,
        displayName,
        email,
        photoURL,
      },
      createdAt: new Date().getTime(),
      respuestas: [],
    };
    await setDoc(newDoc, newPregunta);

    dispatch(addNewEmptyPregunta(newPregunta));
    dispatch(setActivePregunta(newPregunta));
  };
};

export const startNewRespuesta = (
  titleRespuesta,
  idPregunta,
  tituloPregunta
) => {
  return async (dispatch, getState) => {
    dispatch(updatingNewPregunta());
    const { uid } = getState().auth;
    const newDoc = doc(
      collection(
        FirebaseDB,
        `${uid}/entradas/preguntas/${idPregunta}/respuestas`
      )
    );
    const newRespuesta = {
      id: newDoc.id,
      idPregunta,
      titulo: titleRespuesta,
      autor: {
        id: uid,
        displayName,
        email,
        photoURL,
      },
      createdAt: new Date().getTime(),
    };
    await setDoc(newDoc, newRespuesta);
    dispatch(addNewRespuesta({ idPregunta, newRespuesta }));
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
  // console.log("startLoadingRespuestas", id);
  return async (dispatch, getState) => {
    dispatch(loadingRespuestas());
    const { uid } = getState().auth;
    if (!uid) throw new Error("No hay usuario logueado");
    const respuestas = await loadRespuestasById(uid, id);
    // console.log("startLoadingRespuestas", respuestas);
    dispatch(setRespuestas({ respuestas, idPregunta: id }));
  };
};
