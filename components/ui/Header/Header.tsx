import Link from "next/link";
import React from "react";
import { useAppSelector } from "../../../hooks";
import { UserAvatar } from "../../User/UserAvatar/UserAvatar";
import { LoginWithGoogle } from "../../User/UserLogin/LoginWithGoogle/UserLogin";
import styles from "./Header.module.scss";

export const Header = () => {
  const { status } = useAppSelector((state) => state.auth);
  console.log('status',status)
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link href="/">
            <a>Inicio</a>
          </Link>
        </div>
        <nav>
          <Link href="/perfil" >
              <span className={styles.header__linkPerfil}>Mi Perfil</span>
          </Link>
        </nav>
        {status === "authenticated" ? <UserAvatar /> : <LoginWithGoogle />}
      </div>
    </header>
  );
};
