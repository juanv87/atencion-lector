import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { useSelector } from "react-redux";
import { useAppSelector } from "../hooks";
import { FirebaseDB } from "../lib/firebase/firebase";
import { IPregunta } from "../types/IPregunta";

interface Props {
  id: string;
  uid: string | null;
}

export const checkSavedPregunta = async ({ id, uid }: Props) => {
  // TODO: todo este choclo que trae las preguntas guardadas del usuario hay que extraerlo en una función específica.
  const collectionQuery = query(
    collection(FirebaseDB, "usuarios"),
    where("uid", "==", uid)
  );
  const docs = await getDocs(collectionQuery);
  const preguntas = [] as Array<{} | any>;
  docs.forEach((doc) => {
    preguntas.push({ ...doc.data() });
  });

  const preguntasGuardadas = preguntas[0].preguntasGuardadas?.map(
    (pregunta: IPregunta) => pregunta.id
  );

  // check if the pregunta is saved
  const isSaved = preguntasGuardadas?.includes(id);

  return isSaved;
};
