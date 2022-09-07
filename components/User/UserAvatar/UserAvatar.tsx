import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLogout } from "../../../store/auth";
import styles from "./UserAvatar.module.scss";

export const UserAvatar = () => {
  const { displayName, email, photoURL } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  const onLogOut = () => {
    dispatch(startLogout());
  };

  return (
    <section className={styles.userAvatar}>
      <div className={styles.userAvatar__name}>
        <p>{email}</p>
      </div>
      <div className={styles.userAvatar__image}>
        <img
          src={photoURL !== null ? photoURL : ""}
          alt={displayName !== null ? displayName : ""}
        />
      </div>
      <div onClick={onLogOut} className={styles.userAvatar__logOutButton}>
        LogOut
      </div>
    </section>
  );
};
