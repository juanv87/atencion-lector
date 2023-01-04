// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  tweets: Array<{}>;
};

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../../lib/firebase/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ref = collection(FirebaseDB, "tweets");

  const collectionQuery = query(
    ref,
    limit(req.query.limit as unknown as number),
    orderBy("createdAt", "desc")
  );

  const docs = await getDocs(collectionQuery);
  let tweets = [] as Array<{}>;
  docs.forEach((doc) => {
    tweets = [...tweets, { id: doc.id, ...doc.data() }];
  });
  res.status(200).json({ tweets });
}
