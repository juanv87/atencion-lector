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

interface Props {
  pregunta: IPregunta;
}

export const Pregunta = ({ pregunta }: Props) => {
  const dispatch = useAppDispatch();
  const { id, titulo, autor } = pregunta;

  // Todo: Revisar si es eficiente traer todas las preguntas para obtener el id actual y traer las respuestas del store.
  const { preguntas, isLoadingRespuestas } = useAppSelector(
    (state) => state.entries
  );
  // Busco la posición de la pregunta actual en la lista de preguntas
  const index = preguntas.findIndex((preg) => preg.id === pregunta.id);
  // Traigo las respuestas de la pregunta actual
  const { respuestas } = useAppSelector(
    (state) => state.entries.preguntas[index]
  );

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
        {respuestas.length > 0 &&
          respuestas.map(({ id, titulo }) => (
            <Respuesta key={id} titulo={titulo} />
          ))}
      </article>
    </>
  );
};
