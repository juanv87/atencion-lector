// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  likes: Array<{}>;
};

import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../../../lib/firebase/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ref = collection(FirebaseDB, "preguntas");

  const collectionQuery = query(
    ref,
    where("id", "==", req.query.id as unknown as string),
    where("validada", "==", true )
  );

  const docs = await getDocs(collectionQuery);
  let likes = [] as Array<{}>;
  docs.forEach((doc) => {
    likes = doc.data().likes;
  });
  res.status(200).json({ likes });
}
