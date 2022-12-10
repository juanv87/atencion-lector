import { collection, getDocs, limit, query } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

export const loadTweets = async (limitTweets: number) => {

  const ref = collection(FirebaseDB, "tweets");

  const collectionQuery = query(
    ref, limit(limitTweets),
  );

  const docs = await getDocs(collectionQuery);
  let tweets = [] as Array<{}>;
  docs.forEach((doc) => {
    tweets = [...tweets, { id: doc.id, ...doc.data() }];
  });
  return tweets;
};
