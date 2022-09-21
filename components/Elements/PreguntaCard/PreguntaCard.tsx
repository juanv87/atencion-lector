import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startSavingPregunta } from "../../../store/entries";
import styles from "./Pregunta.module.scss";
import { IPregunta } from "../../../types/IPregunta";
import { AddRespuesta } from "../../User/AddRespuesta/AddRespuesta";
import { AutorAvatar } from "../AutorAvatar/AutorAvatar";
import { ListaRespuestas } from "../ListaRespuestas/ListaRespuestas";
import { MouseEvent, useEffect, useState } from "react";
import { IconBtnSave } from "../../Icons/IconBtnSave";
import { IconShowRespuestas } from "../../Icons/IconShowRespuestas";
import { checkSavedPregunta } from "../../../helpers/checkSavedPregunta";
import { IconBtnSaved } from "../../Icons/IconBtnSaved";
import { setUpdatedSaved } from "../../../store/savedByUser/savedByUserSlice";

interface Props {
  pregunta: IPregunta;
}

export const PreguntaCard = ({ pregunta }: Props) => {
  const [showRespuestas, setShowRespuestas] = useState(false);
  const [savingPregunta, setSavingPregunta] = useState(false);
  const [savedPregunta, setSavedPregunta] = useState(false);

  const { uid } = useAppSelector((state) => state.auth);

  const { id, titulo, autor, respuestas } = pregunta;

  const dispatch = useAppDispatch();

  const onSavePregunta = async (e: MouseEvent) => {
    e.preventDefault();
    setSavingPregunta(true);
    await dispatch(startSavingPregunta({ pregunta }));
    setSavedPregunta(true);
    dispatch(setUpdatedSaved(true))
  };

  const onShowRespuestas = (e: MouseEvent) => {
    e.preventDefault();
    setShowRespuestas(!showRespuestas);
  };

  const checkIfSaved = async () => {
    const isSaved = await checkSavedPregunta({ id, uid });
    setSavedPregunta(isSaved);
  };

  useEffect(() => {
    checkIfSaved();
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
          {savedPregunta ? <IconBtnSaved /> : <IconBtnSave />}
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

        {showRespuestas && id && <ListaRespuestas respuestas={respuestas} />}
      </article>
    </>
  );
};
