import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  startLoadingRespuestas,
  startSavingPregunta,
} from "../../../store/entries";
import styles from "./Pregunta.module.scss";
import { IPregunta } from "../../../types/IPregunta";
import { AddRespuesta } from "../../User/AddRespuesta/AddRespuesta";
import { AutorAvatar } from "../AutorAvatar/AutorAvatar";
import { Respuestas } from "../Respuestas/Respuestas";
import { MouseEvent, MouseEventHandler, useState } from "react";

interface Props {
  pregunta: IPregunta;
}

export const Pregunta = ({ pregunta }: Props) => {
  const [showRespuestas, setShowRespuestas] = useState(false);

  const { id, titulo, autor } = pregunta;
  const dispatch = useAppDispatch();

  const onSavePregunta = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(startSavingPregunta({ pregunta }));
  };

  const onShowRespuestas = (e: MouseEvent) => {
    e.preventDefault();
    setShowRespuestas(!showRespuestas);
  };

  return (
    <>
      <article
        className={`${styles.tarjetaPregunta} animate__fadeInUp animate__animated animate__faster`}
      >
        <AutorAvatar autor={autor} />
        <h2 className={styles.tarjetaPregunta__title}>{titulo}</h2>
        <AddRespuesta idPregunta={id} />
        <button onClick={onSavePregunta}>Guardar</button>
        <button onClick={onShowRespuestas}>Ver respuestas</button>
        {showRespuestas && id && <Respuestas idPregunta={id} />}
      </article>
    </>
  );
};
