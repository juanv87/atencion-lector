import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../hooks";
import { FirebaseAuth, FirebaseDB } from "../lib/firebase/firebase";
import { checkingCredentials, login, logout } from "../store/auth";
import { startLoadingPreguntas } from "../store/entries";
import { doc, getDoc } from "firebase/firestore/lite";

export const useCheckAuth = () => {
  const { status, nickName, email } = useAppSelector((state) => state.auth);
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
          admin: uid === "bu5sLZrkzrZtgVhwgs94CZgJzaM2" || uid === "q3emq7VZ2JPxYLhXL3qLTSIEUwl2" ? true : false,
          nickName: userInfo?.nickName,
        })
      );
    });
  }, []);
  return status;
};
