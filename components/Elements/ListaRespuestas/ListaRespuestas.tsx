import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
// import { startLoadingRespuestas } from "../../../store/entries";
import { RespuestaCard } from "../RespuestaCard/RespuestaCard";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import styles from "./Respuestas.module.scss";
import { IRespuesta } from "../../../types/IRespuesta";

interface Props {
  respuestas: IRespuesta[];
}

export const ListaRespuestas = ({ respuestas }: Props) => {
  return (
    <section className={styles.respuestasContainer}>
      {respuestas &&
        respuestas.map(({ id, titulo, autor }) => (
          <RespuestaCard key={id} titulo={titulo} autor={autor} />
        ))}
    </section>
  );
};
