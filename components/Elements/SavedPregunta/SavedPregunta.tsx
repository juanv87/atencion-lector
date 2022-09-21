import React from "react";
import { IPregunta } from "../../../types/IPregunta";
import styles from "./SavedPregunta.module.scss";
import { AutorAvatar } from "../AutorAvatar/AutorAvatar";
import IconBin from '../../Icons/IconBin'

interface Props {
  pregunta: IPregunta;
}

export const SavedPregunta = ({ pregunta }: Props) => {
  // console.log(
  //   "🚀 ~ file: SavedPregunta.tsx ~ line 10 ~ SavedPregunta ~ pregunta",
  //   pregunta
  // );
  const { autor, titulo } = pregunta;

  const handleDeleteSaved = () => {
    console.log(pregunta.id)
  }
  return (
    <>
      <article className={styles.savedPregunta}>
        <div className={styles.savedPregunta__header}>
          <AutorAvatar avatarSize="20" autor={autor} />
          <span onClick={handleDeleteSaved}><IconBin/></span>
        </div>
        <h3>{titulo}</h3>
      </article>
    </>
  );
};
