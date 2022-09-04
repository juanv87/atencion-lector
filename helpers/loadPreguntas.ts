import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

export const loadPreguntas = async (uid = "") => {
  if (!uid) throw new Error("No hay usuario logueado");
  const collectionRef = collection(FirebaseDB, `${uid}/entradas/preguntas`);
  const docs = await getDocs(collectionRef);
  const preguntas = [] as Array<{}>;
  docs.forEach((doc) => {
    preguntas.push({ id: doc.id, ...doc.data() });
  });
  return preguntas;
};
