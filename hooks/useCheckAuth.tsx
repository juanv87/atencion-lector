import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../hooks";
import { FirebaseAuth } from "../lib/firebase/firebase";
import { login, logout } from "../store/auth";
import { startLoadingPreguntas } from "../store/entries";

export const useCheckAuth = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout(user));
      const { displayName, email, photoURL, uid } = user;
      dispatch(login({ displayName, email, photoURL, uid }));
      dispatch(startLoadingPreguntas());
    });
  }, []);
  return status;
};
