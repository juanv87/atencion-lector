import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  startLoadingRespuestas,
  startSavingPregunta,
} from "../../../store/entries";
import styles from "./Pregunta.module.scss";
import { IPregunta } from "../../../types/IPregunta";
import { AddRespuesta } from "../../User/AddRespuesta/AddRespuesta";
import { AutorAvatar } from "../AutorAvatar/AutorAvatar";
import { ListaRespuestas } from "../ListaRespuestas/ListaRespuestas";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { IconBtnSave } from "../../Icons/IconBtnSave";
import { IconShowRespuestas } from "../../Icons/IconShowRespuestas";

interface Props {
  pregunta: IPregunta;
}

export const PreguntaCard = ({ pregunta }: Props) => {
  const [showRespuestas, setShowRespuestas] = useState(false);

  const { isLoadingPreguntas } = useAppSelector(
    (state) => state.entries
    );
  console.log("🚀 ~ file: PreguntaCard.tsx ~ line 23 ~ PreguntaCard ~ isLoadingPreguntas", isLoadingPreguntas)


  const { id, titulo, autor, respuestas } = pregunta;
  // console.log(
  //   "🚀 ~ file: Pregunta.tsx ~ line 27 ~ Pregunta ~ respuestas",
  //   respuestas
  // );
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

  console.log('Respuestas desde PreguntaCard', respuestas)
  console.log('Preguntas desde PreguntaCard', pregunta)

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

        {showRespuestas && id && <ListaRespuestas idPregunta={id} />}
      </article>
    </>
  );
};
