import { collection, getDocs, query, where , doc, getDoc} from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

interface Props {
  uid: string;
}

export const loadSavedPreguntasByUser = async ({ uid }: Props) => {
  
  const collectionRef = doc(FirebaseDB, "usuarios", uid);

  const docs = await getDoc(collectionRef);
  console.log("🚀 ~ file: loadSavedPreguntasByUser.ts ~ line 17 ~ loadSavedPreguntasByUser ~ docs", docs.data())
  
  // const savedPreguntas = [] as Array<{}>;
  const userInfo = docs.data()
  const savedPreguntas = userInfo?.preguntasGuardadas  
  return savedPreguntas;
};
