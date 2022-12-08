import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLogout } from "../../../store/auth";
import styles from "./UserAvatar.module.scss";

export const UserAvatar = ({
  size = "40",
  showName = false,
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
        <Link href="/perfil/">
          <a>
            <img
              width={size}
              src={!photoURL || "/img/avatar.jpg"}
              alt={displayName !== null ? displayName : ""}
            />
            {showName && <span>{displayName}</span>}
          </a>
        </Link>
      </div>
      {showLogOut && (
        <div onClick={onLogOut} className={styles.userAvatar__logOutButton}>
          LogOut
        </div>
      )}
    </section>
  );
};
