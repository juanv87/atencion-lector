import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  setActivePregunta,
  startLoadingRespuestas,
} from "../../../store/entries";
import styles from "./Pregunta.module.scss";
import { IPregunta } from "../../../types/IPregunta";
import { AddRespuesta } from "../../User/AddRespuesta";

interface Props {
  pregunta: IPregunta;
}

export const Pregunta = ({ pregunta }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setActivePregunta({ pregunta }));
  };
  const { id, titulo } = pregunta;
  dispatch(startLoadingRespuestas(id));
  console.log("Pregunta", id);
  return (
    <>
      <article
        // onClick={handleClick}
        className={`${styles.tarjetaPregunta} animate__fadeInUp animate__animated animate__faster`}
      >
        <h2 className={styles.tarjetaPregunta__title}>{titulo}</h2>
        {/* <p className={styles.tarjetaPregunta__cuerpo}>{cuerpo}</p> */}
        <AddRespuesta id={id} />
      </article>
    </>
  );
};
