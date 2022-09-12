import Link from "next/link";
import React from "react";
import { IAutor } from "../../../types/IAutor";

import styles from "./AutorAvatar.module.scss";

interface Props {
  autor: IAutor;
}

export const AutorAvatar = ({ autor }: Props) => {
  const { displayName, photoURL, userName } = autor;
  return (
    <>
      <section className={styles.autorAvatar}>
        <Link href={`${userName}`}>
          <a className={styles.autorAvatar__autorLink}>
            <picture className={styles.autorAvatar__picture}>
              <img
                className={styles.autorAvatar__imgAutor}
                width="30"
                src={photoURL || "https://i.pravatar.cc/80"}
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
