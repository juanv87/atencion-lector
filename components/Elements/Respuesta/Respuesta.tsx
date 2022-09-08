import React from "react";
import styles from "./Respuesta.module.scss";

interface Props {
  titulo: string;
  autor: string;
}

export const Respuesta = ({ titulo, autor }: Props) => {
  const { displayName } = autor as Object as { displayName: string };
  return (
    <article className={styles.tarjetaRespuesta}>
      <h3 className={styles.respuesta__title}>{titulo}</h3>
      <p>{displayName}</p>
    </article>
  );
};
