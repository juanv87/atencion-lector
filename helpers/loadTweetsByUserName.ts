import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

interface Props {
  name: string;
}

export const loadTweetsByUserName = async ({ name }: Props) => {
  // * El problema aca es que trae las preguntas de firebase pero ahi no tiene las respuestas. Las respuestas estan en el store.

  const collectionQuery = query(
    collection(FirebaseDB, "tweets"),
    where("autor.userName", "==", name)
  );

  // const collectionRef = collection(FirebaseDB, `/tweets/${id}/respuestas`);
  const docs = await getDocs(collectionQuery);
  const tweets = [] as Array<{}>;
  docs.forEach((doc) => {
    tweets.push({ id: doc.id, ...doc.data() });
  });
  return tweets;
};
