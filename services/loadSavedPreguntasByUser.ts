import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

interface Props {
  uid: string;
}

export const loadSavedPreguntasByUser = async ({ uid }: Props) => {
  const collectionRef = doc(FirebaseDB, "usuarios", uid);
  const docs = await getDoc(collectionRef);
  const userInfo = docs.data();
  const savedPreguntas = userInfo?.preguntasGuardadas;
  return savedPreguntas;
};
