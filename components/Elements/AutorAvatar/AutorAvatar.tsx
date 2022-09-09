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
          <a>
            <picture className={styles.autorAvatar__picture}>
              <img
                className={styles.autorAvatar__imgAutor}
                width="25"
                src={photoURL}
                alt={displayName}
              />
            </picture>
            <span className={styles.autorAvatar__name}>{displayName}</span>
          </a>
        </Link>
      </section>
    </>
  );
};
