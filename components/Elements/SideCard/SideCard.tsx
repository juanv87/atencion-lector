import React, { useState } from "react";
import { IPregunta } from "../../../types/IPregunta";
import styles from "./SideCard.module.scss";
import { AutorAvatar } from "../AutorAvatar/AutorAvatar";
import IconBin from "../../Icons/IconBin";
import useDelete from "../../../hooks/useDelete";
import { useAppSelector } from "../../../hooks";
import { setUpdatedSaved } from "../../../store/savedByUser/savedByUserSlice";
import { ListaRespuestas } from "../ListaRespuestas/ListaRespuestas";
import { IconShowRespuestas } from "../../Icons/IconShowRespuestas";
import IconLike from "../../Icons/IconLike";
import { AddRespuesta } from "../../User/AddRespuesta/AddRespuesta";

interface Props {
  pregunta: IPregunta;
  mostLiked: boolean;
  saved: boolean;
}

export const SideCard = ({ pregunta, mostLiked, saved }: Props) => {
  // console.log(
  //   "🚀 ~ file: SavedPregunta.tsx ~ line 10 ~ SavedPregunta ~ pregunta",
  //   pregunta
  // );
  const { autor, titulo } = pregunta;
  const { updatedSaved } = useAppSelector((state) => state.savedByUser);
  const [savedPregunta, setSavedPregunta] = useState(false);
  const [showRespuestas, setShowRespuestas] = useState(false);

  const { onDeleteSavedPregunta } = useDelete({
    pregunta,
    setSavedPregunta,
    setUpdatedSaved,
    updatedSaved,
    savedPregunta,
  });
  const onShowRespuestas = () => {
    setShowRespuestas(!showRespuestas);
  };

  return (
    <>
      <article className={styles.sideCard}>
        <div className={styles.sideCard__header}>
          <AutorAvatar avatarSize="20" autor={autor} />
          {saved && (
            <span onClick={onDeleteSavedPregunta}>
              <IconBin />
            </span>
          )}
        </div>
        <h3>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make{" "}
        </h3>
        <div className={styles.addRespuesta}>
          <AddRespuesta idPregunta={pregunta.id} />
        </div>
        {mostLiked && (
          <div className={styles.likes}>
            {/* <button onClick={handleLike}> */}
            <IconLike size={18} />
            {/* </button> */}
            <span>{pregunta.likes}</span>
          </div>
        )}
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
          {showRespuestas && (
            <ListaRespuestas respuestas={pregunta.respuestas} />
          )}
        </div>
      </article>
    </>
  );
};
