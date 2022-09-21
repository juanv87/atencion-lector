import { collection, getDocs, query, where , doc, getDoc} from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

interface Props {
  uid: string;
}

export const deleteSavedByUser = async ({ uid }: Props) => {
  
//   const collectionRef = doc(FirebaseDB, "usuarios", uid);

//   const docs = await getDoc(collectionRef);

//   const newDoc = doc(collection(FirebaseDB, "usuarios"), uid);
//     await updateDoc(newDoc, { preguntasGuardadas: arrayUnion(pregunta) })
  
//   // const savedPreguntas = [] as Array<{}>;
//   const userInfo = docs.data()
//   const savedPreguntas = userInfo?.preguntasGuardadas  
//   return savedPreguntas;
};

// To-do --> Ver si se puede actualizar un array dentro de un doc, sino habria que mandar de nuevo el array sin la preg