// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  preguntas: Array<{}>;
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
  const ref = collection(FirebaseDB, "preguntas");
  const docs = await getDocs(ref);
  let preguntas = [] as Array<{}>;
  docs.forEach((doc) => {
    preguntas = [...preguntas, { id: doc.id, ...doc.data() }];
  });
  res.status(200).json({ preguntas });
}
