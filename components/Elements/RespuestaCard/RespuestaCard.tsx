import React from "react";
import styles from "./Respuesta.module.scss";

interface Props {
  titulo: string;
  autor: string;
}

export const RespuestaCard = ({ titulo, autor }: Props) => {
  const { displayName } = autor as Object as { displayName: string };

  return (
    <article className={styles.tarjetaRespuesta}>
      <h3 className={styles.tarjetaRespuesta__title}>{titulo}</h3>
      <p className={styles.tarjetaRespuesta__autorNombre}>{displayName}</p>
    </article>
  );
};
