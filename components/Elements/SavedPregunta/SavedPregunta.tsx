import React, { useState } from "react";
import { IPregunta } from "../../../types/IPregunta";
import styles from "./SavedPregunta.module.scss";
import { AutorAvatar } from "../AutorAvatar/AutorAvatar";
import IconBin from '../../Icons/IconBin'
import useDelete from "../../../hooks/useDelete";
import { useAppSelector } from "../../../hooks";
import { setUpdatedSaved } from '../../../store/savedByUser/savedByUserSlice'

interface Props {
  pregunta: IPregunta;
}

export const SavedPregunta = ({ pregunta }: Props) => {
  // console.log(
  //   "🚀 ~ file: SavedPregunta.tsx ~ line 10 ~ SavedPregunta ~ pregunta",
  //   pregunta
  // );
  const { autor, titulo } = pregunta;
  const [savedPregunta, setSavedPregunta] = useState(false);
  const { updatedSaved } = useAppSelector((state) => state.savedByUser);

  const { onDeleteSavedPregunta } = useDelete({pregunta, setSavedPregunta, setUpdatedSaved, updatedSaved, savedPregunta})

 
  return (
    <>
      <article className={styles.savedPregunta}>
        <div className={styles.savedPregunta__header}>
          <AutorAvatar avatarSize="20" autor={autor} />
          <span onClick={onDeleteSavedPregunta}><IconBin/></span>
        </div>
        <h3>{titulo}</h3>
      </article>
    </>
  );
};
