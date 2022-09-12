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
import { IconBtnSave } from "../../Icons/IconBtnSave";

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
        <button
          className={styles.tarjetaPregunta__buttonSave}
          onClick={onSavePregunta}
        >
          <IconBtnSave size="20" color="black" />
        </button>
        <button
          className={styles.tarjetaPregunta__buttonShowRespuestas}
          onClick={onShowRespuestas}
        >
          {showRespuestas ? "Ocultar respuestas" : "Mostrar respuestas"}
        </button>
        {showRespuestas && id && <Respuestas idPregunta={id} />}
      </article>
    </>
  );
};
