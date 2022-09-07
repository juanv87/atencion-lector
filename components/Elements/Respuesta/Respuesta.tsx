import React from "react";
import styles from "./Respuesta.module.scss";

interface Props {
  titulo: string;
}

export const Respuesta = ({ titulo }: Props) => {
  return (
    <article className={styles.tarjetaRespuesta}>
      <h3 className={styles.respuesta__title}>{titulo}</h3>
    </article>
  );
};
