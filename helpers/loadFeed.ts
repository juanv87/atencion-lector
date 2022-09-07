import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

export const loadFeed = async () => {
  const collectionRef = collection(
    FirebaseDB,
    "/XMr7ukwRZpVQEbCDtcL5V45sF503/entradas/preguntas"
  );
  const docs = await getDocs(collectionRef);
  const entradas = [] as Array<{}>;
  docs.forEach((doc) => {
    entradas.push({ id: doc.id, ...doc.data() });
  });
  console.log("loadentradasById", entradas);
  return entradas;
};
