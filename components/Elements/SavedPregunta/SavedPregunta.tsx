import React from "react";
import { IPregunta } from "../../../types/IPregunta";
import styles from "./SavedPregunta.module.scss";
import { AutorAvatar } from "../AutorAvatar/AutorAvatar";

interface Props {
  pregunta: IPregunta;
}

export const SavedPregunta = ({ pregunta }: Props) => {
  console.log(
    "🚀 ~ file: SavedPregunta.tsx ~ line 10 ~ SavedPregunta ~ pregunta",
    pregunta
  );
  const { autor, titulo } = pregunta;
  return (
    <>
      <article className={styles.savedPregunta}>
        <AutorAvatar autor={autor} />
        <h3>{titulo}</h3>
      </article>
    </>
  );
};
