import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

export const loadTweets = async () => {
  const collectionRef = collection(FirebaseDB, "tweets");
  const docs = await getDocs(collectionRef);
  let tweets = [] as Array<{}>;
  docs.forEach((doc) => {
    tweets = [...tweets, { id: doc.id, ...doc.data() }];
  });
  return tweets;
};
