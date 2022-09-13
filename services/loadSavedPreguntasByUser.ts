import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

interface Props {
  uid: string;
}

export const loadSavedPreguntasByUser = async ({ uid }: Props) => {
  console.log(
    "🚀 ~ file: loadSavedPreguntasByUser.ts ~ line 9 ~ loadSavedPreguntasByUser ~ uid",
    uid
  );

  const collectionRef = collection(FirebaseDB, "usuarios", uid, "preguntas");

  const docs = await getDocs(collectionRef);
  const savedPreguntas = [] as Array<{}>;
  docs.forEach((doc) => {
    savedPreguntas.push({ id: doc.id, ...doc.data() });
  });
  console.log("loadPreguntasByUserName", savedPreguntas);
  return savedPreguntas;
};
