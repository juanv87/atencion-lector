import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  setActivePregunta,
  startLoadingRespuestas,
} from "../../../store/entries";
import styles from "./Pregunta.module.scss";
import { IPregunta } from "../../../types/IPregunta";
import { AddRespuesta } from "../../User/AddRespuesta/AddRespuesta";
import { loadRespuestasById } from "../../../helpers/loadRespuestasById";
import { Respuesta } from "../Respuesta/Respuesta";
import { AutorAvatar } from "../AutorAvatar/AutorAvatar";
import { Respuestas } from "../Respuestas/Respuestas";

interface Props {
  pregunta: IPregunta;
}

export const Pregunta = ({ pregunta }: Props) => {
  console.log("Pregunta", pregunta);
  const dispatch = useAppDispatch();
  const { id, titulo, autor } = pregunta;
  const { isLoadingRespuestas } = useAppSelector((state) => state.entries);

  const onGetRespuestas = () => {
    dispatch(startLoadingRespuestas(id));
  };

  return (
    <>
      <article
        className={`${styles.tarjetaPregunta} animate__fadeInUp animate__animated animate__faster`}
      >
        <AutorAvatar autor={autor} />
        <h2 className={styles.tarjetaPregunta__title}>{titulo}</h2>
        <AddRespuesta idPregunta={id} tituloPregunta={titulo} />
        <button
          className={styles.tarjetaPregunta__button}
          onClick={onGetRespuestas}
        >
          {isLoadingRespuestas ? "Cargando respuestas..." : "Ver respuestas"}
        </button>
        <Respuestas preguntaId={pregunta.id} />
      </article>
    </>
  );
};
