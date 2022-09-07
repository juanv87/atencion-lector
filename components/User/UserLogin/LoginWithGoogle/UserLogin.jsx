import { useMemo } from "react";
import styles from "./LoginWithGoogle.module.scss";
import {
  checkingAuthentication,
  startGoogleSignIn,
} from "../../../../store/auth";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { IconGoogle } from "../../../Icons/IconGoogle";

export const LoginWithGoogle = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onGoogleSignIn = () => {
    // console.log("Google Sign In");
    dispatch(startGoogleSignIn());
  };
  return (
    <>
      <section className={styles.loginWithGoogle}>
        <div className={styles.loginWithGoogle__icon}>
          <IconGoogle />
        </div>
        <button
          disabled={isAuthenticating}
          onClick={onGoogleSignIn}
          className={styles.loginWithGoogle__button}
        >
          {" "}
          {isAuthenticating
            ? "Iniciando sesión..."
            : "Iniciar sesión con Google"}
        </button>
      </section>
    </>
  );
};
