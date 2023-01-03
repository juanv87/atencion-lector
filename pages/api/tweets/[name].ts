// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  tweets: Array<{}>;
};

import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../../lib/firebase/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("🚀 ~ file: [name].ts:21 ~ req", req.query);
  const ref = collection(FirebaseDB, "tweets");

  const collectionQuery = query(
    ref,
    limit(req.query.limit as unknown as number),
    where("autor.userName", "==", req.query.name as unknown as string)
  );

  const docs = await getDocs(collectionQuery);
  let tweets = [] as Array<{}>;
  docs.forEach((doc) => {
    tweets = [...tweets, { id: doc.id, ...doc.data() }];
  });
  res.status(200).json({ tweets });
}
