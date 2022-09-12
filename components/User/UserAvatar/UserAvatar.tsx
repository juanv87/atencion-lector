import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLogout } from "../../../store/auth";
import styles from "./UserAvatar.module.scss";

export const UserAvatar = ({ showName = true, showLogOut = true }) => {
  const { displayName, email, photoURL, status } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  const onLogOut = () => {
    dispatch(startLogout());
  };

  return (
    <section className={styles.userAvatar}>
      {showName && (
        <div className={styles.userAvatar__name}>
          <p>{email}</p>
        </div>
      )}
      <div className={styles.userAvatar__image}>
        <img
          src={photoURL || "https://i.pravatar.cc/80"}
          alt={displayName !== null ? displayName : ""}
        />
      </div>
      {showLogOut && (
        <div onClick={onLogOut} className={styles.userAvatar__logOutButton}>
          LogOut
        </div>
      )}
    </section>
  );
};
