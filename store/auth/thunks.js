import { collection, doc, setDoc } from "firebase/firestore/lite";

import { signInWithGoogle, logoutFirebase } from "../../lib/firebase/providers";
import { checkingCredentials, logout, login } from ".";
import { clearEntriesLogout } from "../entries";
import { FirebaseDB } from "../../lib/firebase/firebase";
import { getAdditionalUserInfo, getAuth } from "firebase/auth";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));
    const auth = getAuth();
    const { creationTime, lastSignInTime } = auth.currentUser.metadata;
    creationTime === lastSignInTime &&
      (await setDoc(doc(FirebaseDB, "usuarios", result.uid), { ...result }));
    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    // dispatch(clearEntriesLogout());
    dispatch(logout());
  };
};
