import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

export const loadPreguntas = async () => {
  const collectionRef = collection(FirebaseDB, "preguntas");
  const docs = await getDocs(collectionRef);
  let preguntas = [] as Array<{}>;
  docs.forEach((doc) => {
    preguntas = [...preguntas, { id: doc.id, ...doc.data() }];
  });
  return preguntas;
};
