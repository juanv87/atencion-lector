import { collection, doc, setDoc } from "firebase/firestore/lite";
import { loadPreguntas } from "../../helpers/loadPreguntas";
import { loadPreguntasByUserName } from "../../helpers/loadPreguntasByUserName";
import { loadRespuestasById } from "../../helpers/loadRespuestasById";
import { FirebaseDB } from "../../lib/firebase/firebase";
import { loadSavedPreguntasByUser } from "../../services/loadSavedPreguntasByUser";
import {
  addNewEmptyPregunta,
  savingNewPregunta,
  setActivePregunta,
  setPreguntas,
  setRespuestas,
  loadingRespuestas,
  addNewRespuesta,
  updatingNewPregunta,
  loadingPreguntas,
  setPreguntasByUserName,
  setSavedPreguntasByUser,
} from "./entriesSlice";

// Funciones asincronas que modifican el state global de la aplicacion.

export const startNewPregunta = ({ titlePregunta }) => {
  const titlePreguntaSlug =
    titlePregunta.toLowerCase().replace(/ /g, "-") + "-" + Date.now();
  return async (dispatch, getState) => {
    dispatch(savingNewPregunta());
    const { uid, displayName, email, photoURL } = getState().auth;
    const newDoc = doc(collection(FirebaseDB, `preguntas`));
    const newPregunta = {
      id: newDoc.id,
      titulo: titlePregunta,
      autor: {
        id: uid,
        displayName,
        userName: email?.split("@")[0] || "",
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

export const startNewRespuesta = (titleRespuesta, idPregunta) => {
  return async (dispatch, getState) => {
    dispatch(updatingNewPregunta());
    const { uid, displayName, email, photoURL } = getState().auth;
    const newDoc = doc(
      collection(FirebaseDB, `preguntas/${idPregunta}/respuestas`)
    );
    const newRespuesta = {
      id: newDoc.id,
      idPregunta,
      titulo: titleRespuesta,
      autor: {
        id: uid,
        displayName: displayName || "Lector/a anónimo/a",
        userName: email?.split("@")[0] || "",
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
    dispatch(loadingPreguntas());
    const preguntas = await loadPreguntas();
    dispatch(setPreguntas(preguntas));
  };
};

export const startLoadingRespuestas = (id) => {
  // console.log("startLoadingRespuestas", id);
  return async (dispatch, getState) => {
    try {
      dispatch(loadingRespuestas());
      const respuestas = await loadRespuestasById(id);
      dispatch(setRespuestas({ respuestas, idPregunta: id }));
    } catch (error) {
      console.log("startLoadingRespuestas", error);
    }
    // console.log("startLoadingRespuestas", respuestas);
  };
};

export const startLoadingPreguntasByUserName = ({ name }) => {
  return async (dispatch, getState) => {
    dispatch(loadingPreguntas());
    dispatch(startLoadingPreguntas({ name }));
    const preguntas = await loadPreguntasByUserName({ name });
    console.log(
      "🚀 ~ file: thunks.js ~ line 104 ~ return ~ preguntas",
      preguntas
    );
    dispatch(setPreguntasByUserName(preguntas));
  };
};

export const startLoadingSavedPreguntasByUser = () => {
  return async (dispatch, getState) => {
    const { uid, status } = getState().auth;
    console.log("🚀 ~ file: thunks.js ~ line 113 ~ return ~ status", status);
    console.log("🚀 ~ file: thunks.js ~ line 113 ~ return ~ uid", uid);
    try {
      // dispatch(loadingPreguntas());
      // dispatch(startLoadingPreguntas({ name }));
      const savedPreguntas = await loadSavedPreguntasByUser({ uid });
      dispatch(setSavedPreguntasByUser(savedPreguntas));
    } catch (error) {
      console.log("startLoadingSavedPreguntasByUser", error);
      throw error;
    }
  };
};

export const startSavingPregunta = ({ pregunta }) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newDoc = doc(
      collection(FirebaseDB, "usuarios", uid, "preguntas"),
      pregunta.id
    );
    await setDoc(newDoc, pregunta);
  };
};
