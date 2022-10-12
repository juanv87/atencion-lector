import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLogout } from "../../../store/auth";
import styles from "./UserAvatar.module.scss";

export const UserAvatar = ({
  size = "40",
  showName = true,
  showLogOut = true,
}) => {
  const { displayName, email, nickName, photoURL, status } = useAppSelector(
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
          <Link href="/perfil/">
            <a>
              <p>{nickName}</p>
            </a>
          </Link>
        </div>
      )}
      <div className={styles.userAvatar__image}>
        <img
          width={size}
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
