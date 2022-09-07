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

interface Props {
  pregunta: IPregunta;
}

export const Pregunta = ({ pregunta }: Props) => {
  const dispatch = useAppDispatch();

  // Todo: Revisar si es eficiente traer todas las preguntas para obtener el id actual
  const { preguntas } = useAppSelector((state) => state.entries);
  const index = preguntas.findIndex((preg) => preg.id === pregunta.id);
  const { respuestas } = useAppSelector(
    (state) => state.entries.preguntas[index]
  );

  const { id, titulo } = pregunta;

  const onGetRespuestas = () => {
    dispatch(startLoadingRespuestas(id));
  };

  return (
    <>
      <article
        // onClick={handleClick}
        className={`${styles.tarjetaPregunta} animate__fadeInUp animate__animated animate__faster`}
      >
        <h2 className={styles.tarjetaPregunta__title}>{titulo}</h2>
        {/* <p className={styles.tarjetaPregunta__cuerpo}>{cuerpo}</p> */}
        <AddRespuesta idPregunta={id} tituloPregunta={titulo} />
        <button
          className={styles.tarjetaPregunta__button}
          onClick={onGetRespuestas}
        >
          Mostrar respuestas
        </button>
        {respuestas.length > 0 &&
          respuestas.map(({ id, titulo }) => (
            <Respuesta key={id} titulo={titulo} />
          ))}
      </article>
    </>
  );
};
