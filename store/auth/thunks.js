// Los thunks son funciones que retornan funciones que reciben como parámetro el dispatch y el getState de redux y que pueden ser asincrónicas o no.
// En este caso, el thunk que se exporta es una función que recibe como parámetro el objeto de usuario y que retorna una función que recibe como parámetro el dispatch y el getState de redux.
// Esta función interna es asincrónica y hace uso de la función dispatch para ejecutar acciones de redux.
// La función dispatch recibe como parámetro una acción de redux que es un objeto con dos propiedades: type y payload.
// La propiedad type es un string que indica el tipo de acción que se está ejecutando.
// La propiedad payload es un objeto que contiene la información que se va a utilizar para actualizar el estado de la aplicación.
// En este caso, la acción que se ejecuta es la función login que se importa desde el archivo authSlice.js.
// La función login recibe como parámetro el objeto de usuario y retorna un objeto con dos propiedades: type y payload.
// La propiedad type es un string que indica el tipo de acción que se está ejecutando.
// La propiedad payload es un objeto que contiene la información que se va a utilizar para actualizar el estado de la aplicación.
// En este caso, la propiedad payload es el objeto de usuario que se recibe como parámetro en la función que se exporta.
import { collection, doc, setDoc } from "firebase/firestore/lite";

import { signInWithGoogle, logoutFirebase } from "../../lib/firebase/providers";
import { checkingCredentials, logout, login } from ".";
import { clearEntriesLogout } from "../entries";
import { FirebaseDB } from "../../lib/firebase/firebase";

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

    // if (metadata.creationTime === metadata.lastSignInTime) {
    //   console.log("Nuevo usuario");
    //   const newDoc = doc(collection(FirebaseDB, `usuarios`));
    //   const user = {
    //     id: newDoc.id,
    //     displayName,
    //     userName: email?.split("@")[0] || "",
    //     email,
    //     photoURL,
    //   };
    //   await setDoc(newDoc, user);
    // }
    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearEntriesLogout());
    dispatch(logout());
  };
};
