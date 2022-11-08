import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

interface Props {
  name: string;
}

export const loadUserIdByUserName = async ({ name }: Props) => {
  const collectionQuery = query(
    collection(FirebaseDB, "usuarios"),
    where("nickName", "==", name)
  );

  // const collectionRef = collection(FirebaseDB, `/preguntas/${id}/respuestas`);
  const docs = await getDocs(collectionQuery);
  const usuarioNick = [] as Array<{}>;
  docs.forEach((doc) => {
    usuarioNick.push({ id: doc.id, ...doc.data() });
  });
  console.log("usuario nickname", usuarioNick);
  return usuarioNick[0];
};
