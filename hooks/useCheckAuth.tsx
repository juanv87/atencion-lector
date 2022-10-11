import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../hooks";
import { FirebaseAuth, FirebaseDB } from "../lib/firebase/firebase";
import { checkingCredentials, login, logout } from "../store/auth";
import { startLoadingPreguntas } from "../store/entries";
import { doc, getDoc } from "firebase/firestore/lite";

export const useCheckAuth = () => {
  const { status, nickName, email } = useAppSelector((state) => state.auth);
  console.log(
    "🚀 ~ file: useCheckAuth.tsx ~ line 10 ~ useCheckAuth ~ email",
    email
  );
  console.log(
    "🚀 ~ file: useCheckAuth.tsx ~ line 10 ~ useCheckAuth ~ nickName",
    nickName
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout(user));
      const { displayName, email, photoURL, uid } = user;
      const collectionRef = doc(FirebaseDB, "usuarios", uid);
      const docs = await getDoc(collectionRef);
      const userInfo = docs.data();
      dispatch(
        login({
          displayName,
          email,
          photoURL,
          uid,
          nickName: userInfo?.nickName,
        })
      );
    });
  }, []);
  return status;
};
