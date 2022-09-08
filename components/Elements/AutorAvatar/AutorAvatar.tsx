import React from "react";
import { IAutor } from "../../../types/IAutor";

import styles from "./AutorAvatar.module.scss";

interface Props {
  autor: IAutor;
}

export const AutorAvatar = ({ autor }: Props) => {
  const { displayName, photoURL } = autor;
  return (
    <>
      <section className={styles.autorAvatar}>
        <picture className={styles.autorAvatar__picture}>
          <img
            className={styles.autorAvatar__imgAutor}
            width="25"
            src={photoURL}
            alt={displayName}
          />
        </picture>
        <span className={styles.autorAvatar__name}>{displayName}</span>
      </section>
    </>
  );
};
