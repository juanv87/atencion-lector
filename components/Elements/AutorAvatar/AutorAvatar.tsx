import Link from "next/link";
import React from "react";
import { IAutor } from "../../../types/IAutor";

import styles from "./AutorAvatar.module.scss";

interface Props {
  autor: IAutor;
  avatarSize?: string;
}

export const AutorAvatar = ({ autor, avatarSize = "30" }: Props) => {
  const { displayName, photoURL, userName } = autor;
  return (
    <>
      <section className={styles.autorAvatar}>
        <Link href={`/${userName}`}>
          <a className={styles.autorAvatar__autorLink}>
            <picture className={styles.autorAvatar__picture}>
              <img
                className={styles.autorAvatar__imgAutor}
                width={avatarSize}
                src={photoURL || "/img/avatar.jpg"}
                alt={displayName || "Lector/a anónimo/a"}
              />
            </picture>
            <span className={styles.autorAvatar__name}>
              {displayName || "Lector/a anónimo/a"}
            </span>
          </a>
        </Link>
      </section>
    </>
  );
};
