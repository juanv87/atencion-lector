import React from "react";
import styles from "./Respuesta.module.scss";

interface Props {
  titulo: string;
  autor: string;
}

export const Respuesta = ({ titulo, autor }: Props) => {
  console.log("🚀 ~ file: RespuestaCard.tsx ~ line 10 ~ Respuesta ~ titulo", titulo)
  const { displayName } = autor as Object as { displayName: string };

  
  return (
    <article className={styles.tarjetaRespuesta}>
      <h3 className={styles.tarjetaRespuesta__title}>{titulo}</h3>
      <p className={styles.tarjetaRespuesta__autorNombre}>{displayName}</p>
    </article>
  );
};
