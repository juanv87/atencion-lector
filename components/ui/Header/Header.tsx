import Link from "next/link";
import React from "react";
import { useAppSelector } from "../../../hooks";
import { UserAvatar } from "../../User/UserAvatar/UserAvatar";
import { LoginWithGoogle } from "../../User/UserLogin/LoginWithGoogle/UserLogin";
import styles from "./Header.module.scss";

export const Header = () => {
  const { status } = useAppSelector((state) => state.auth);
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link href="/">
            <a>Inicio</a>
          </Link>
        </div>
        {status === "authenticated" ? <UserAvatar /> : <LoginWithGoogle />}
      </div>
    </header>
  );
};
