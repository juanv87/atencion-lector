import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

export const loadRespuestasById = async (id = "") => {
  const collectionRef = collection(FirebaseDB, `/preguntas/${id}/respuestas`);
  const docs = await getDocs(collectionRef);
  const respuestas = [] as Array<{}>;
  docs.forEach((doc) => {
    respuestas.push({ id: doc.id, ...doc.data() });
  });
  return respuestas;
};
