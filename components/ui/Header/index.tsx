import React from "react";
import { useAppSelector } from "../../../hooks";
import { UserAvatar } from "../../User/UserAvatar";
import { LoginWithGoogle } from "../../User/UserLogin/LoginWithGoogle";
import styles from "./Header.module.scss";

export const Header = () => {
  const { status } = useAppSelector((state) => state.auth);
  return (
    <header className={styles.header}>
      <div
        className={`${styles.header__container} animate__animated animate__fadeInDown animate__faster`}
      >
        <div className={styles.header__logo}></div>
        {status === "authenticated" ? <UserAvatar /> : <LoginWithGoogle />}
      </div>
    </header>
  );
};
