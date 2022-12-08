import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

interface Props {
  name: string;
}

export const loadPreguntasByUserName = async ({ name }: Props) => {
  // * El problema aca es que trae las preguntas de firebase pero ahi no tiene las respuestas. Las respuestas estan en el store.

  const collectionQuery = query(
    collection(FirebaseDB, "preguntas"),
    where("autor.userName", "==", name)
  );

  // const collectionRef = collection(FirebaseDB, `/preguntas/${id}/respuestas`);
  const docs = await getDocs(collectionQuery);
  const preguntas = [] as Array<{}>;
  docs.forEach((doc) => {
    preguntas.push({ id: doc.id, ...doc.data() });
  });
  return preguntas;
};
