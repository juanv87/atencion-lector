import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

export const loadRespuestasById = async (uid = "", id = "") => {
  console.log("loadRespuestasById", uid);
  if (!uid) throw new Error("No hay usuario logueado");
  const collectionRef = collection(
    FirebaseDB,
    `${uid}/entradas/preguntas/${id}/respuestas`
  );
  const docs = await getDocs(collectionRef);
  const respuestas = [] as Array<{}>;
  docs.forEach((doc) => {
    respuestas.push({ id: doc.id, ...doc.data() });
  });
  return respuestas;
};
