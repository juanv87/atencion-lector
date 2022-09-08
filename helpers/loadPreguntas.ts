import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

export const loadPreguntas = async (email = "") => {
  if (!email) throw new Error("No hay usuario logueado");
  const collectionRef = collection(FirebaseDB, `preguntas`);
  const docs = await getDocs(collectionRef);
  const preguntas = [] as Array<{}>;
  docs.forEach((doc) => {
    preguntas.push({ id: doc.id, ...doc.data() });
  });
  return preguntas;
};
