import React, { useState } from "react";
import { IPregunta } from "../../../types/IPregunta";
import styles from "./SavedPregunta.module.scss";
import { AutorAvatar } from "../AutorAvatar/AutorAvatar";
import IconBin from '../../Icons/IconBin'
import useDelete from "../../../hooks/useDelete";
import { useAppSelector } from "../../../hooks";
import { setUpdatedSaved } from '../../../store/savedByUser/savedByUserSlice'
import { ListaRespuestas } from "../ListaRespuestas/ListaRespuestas";
import { IconShowRespuestas } from '../../Icons/IconShowRespuestas'

interface Props {
  pregunta: IPregunta;
}

export const SavedPregunta = ({ pregunta }: Props) => {
  // console.log(
  //   "🚀 ~ file: SavedPregunta.tsx ~ line 10 ~ SavedPregunta ~ pregunta",
  //   pregunta
  // );
  const { autor, titulo } = pregunta;
  const { updatedSaved } = useAppSelector((state) => state.savedByUser);
  const [savedPregunta, setSavedPregunta] = useState(false);
  const [ showRespuestas, setShowRespuestas ] = useState(false)

  const { onDeleteSavedPregunta } = useDelete({pregunta, setSavedPregunta, setUpdatedSaved, updatedSaved, savedPregunta})
  const onShowRespuestas = () => {
    setShowRespuestas(!showRespuestas)
  }
 
  return (
    <>
      <article className={styles.savedPregunta}>
        <div className={styles.savedPregunta__header}>
          <AutorAvatar avatarSize="20" autor={autor} />
          <span onClick={onDeleteSavedPregunta}><IconBin/></span>
        </div>
        <h3>{titulo}</h3>
        <div className="savedPregunta__respuestas">
        {pregunta.respuestas.length > 0 ? (
          <button
            className={styles.buttonShowRespuestas}
            onClick={onShowRespuestas}
          >
            <IconShowRespuestas />
            <span>
              {showRespuestas
                ? "Ocultar respuestas"
                : `Ver respuestas (${pregunta.respuestas?.length})`}
            </span>
          </button>
        ) : (
          <p className={styles.sinRespuestas}>Todavía no hay respuestas</p>
        )}
          {
            showRespuestas && 
          <ListaRespuestas respuestas={pregunta.respuestas}/>
          }
        </div>
      </article>
    </>
  );
};
