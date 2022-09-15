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
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { IconBtnSave } from "../../Icons/IconBtnSave";
import { IconShowRespuestas } from "../../Icons/IconShowRespuestas";

interface Props {
  pregunta: IPregunta;
}

export const Pregunta = ({ pregunta }: Props) => {
  const [showRespuestas, setShowRespuestas] = useState(false);

  const { id, titulo, autor, respuestas } = pregunta;
  console.log(
    "🚀 ~ file: Pregunta.tsx ~ line 27 ~ Pregunta ~ respuestas",
    respuestas
  );
  const dispatch = useAppDispatch();

  const onSavePregunta = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(startSavingPregunta({ pregunta }));
  };

  const onShowRespuestas = (e: MouseEvent) => {
    e.preventDefault();
    setShowRespuestas(!showRespuestas);
  };

  useEffect(() => {
    setShowRespuestas(true);
  }, []);

  return (
    <>
      <article
        className={`${styles.tarjetaPregunta} animate__fadeInUp animate__animated animate__faster`}
      >
        <AutorAvatar autor={autor} />
        <h2 className={styles.title}>{titulo}</h2>
        <AddRespuesta idPregunta={id} />
        <button className={styles.buttonSave} onClick={onSavePregunta}>
          <IconBtnSave size="15" color="black" />
        </button>
        {respuestas.length > 0 ? (
          <button
            className={styles.buttonShowRespuestas}
            onClick={onShowRespuestas}
          >
            <IconShowRespuestas />
            <span>
              {showRespuestas
                ? "Ocultar respuestas"
                : `Ver respuestas (${respuestas?.length})`}
            </span>
          </button>
        ) : (
          <p className={styles.sinRespuestas}>Todavía no hay respuestas</p>
        )}

        {showRespuestas && id && <Respuestas idPregunta={id} />}
      </article>
    </>
  );
};
