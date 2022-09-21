import {
  arrayUnion,
  collection,
  doc,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { loadPreguntas } from "../../helpers/loadPreguntas";
import { loadPreguntasByUserName } from "../../helpers/loadPreguntasByUserName";
import { FirebaseDB } from "../../lib/firebase/firebase";
import { loadSavedPreguntasByUser } from "../../services/loadSavedPreguntasByUser";
import {
  addNewEmptyPregunta,
  savingNewPregunta,
  setActivePregunta,
  setPreguntas,
  addNewRespuesta,
  updatingNewPregunta,
  loadingPreguntas,
  setPreguntasByUserName,
  // setSavedPreguntasByUser,
} from "./entriesSlice";
import { setSavedPreguntasByUser } from '../savedByUser/savedByUserSlice'

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

    const docRef = doc(FirebaseDB, "preguntas", idPregunta);

    // const collectionQuery = query(
    //   collection(FirebaseDB, "preguntas"),
    //   where("id", "==", idPregunta)
    // );

    // const newDoc = doc(
    //   collection(FirebaseDB, `preguntas/${idPregunta}/respuestas`)
    // );
    const newRespuesta = {
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
    await updateDoc(docRef, { respuestas: arrayUnion(newRespuesta) });

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

export const startLoadingPreguntasByUserName = ({ name }) => {
  return async (dispatch, getState) => {
    dispatch(loadingPreguntas());
    dispatch(startLoadingPreguntas({ name }));
    const preguntas = await loadPreguntasByUserName({ name });
    // console.log(
    //   "🚀 ~ file: thunks.js ~ line 104 ~ return ~ preguntas",
    //   preguntas
    // );
    dispatch(setPreguntasByUserName(preguntas));
  };
};

export const startLoadingSavedPreguntasByUser = () => {
  return async (dispatch, getState) => {
    const { uid, status } = getState().auth;
    try {
      const savedPreguntas = await loadSavedPreguntasByUser({ uid });
      console.log("loadPreguntasByUserName desde thunk", savedPreguntas);

      dispatch(setSavedPreguntasByUser(savedPreguntas));
    } catch (error) {
      throw error;
    }
  };
};

export const startSavingPregunta = ({ pregunta }) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newDoc = doc(collection(FirebaseDB, "usuarios"), uid);
    await updateDoc(newDoc, { preguntasGuardadas: arrayUnion(pregunta) });
  };
};
