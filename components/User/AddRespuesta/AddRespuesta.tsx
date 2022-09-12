import React, { useState } from "react";
import styles from "./AddRespuesta.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startNewRespuesta } from "../../../store/entries";
import { IconSendRespuesta } from "../../Icons/IconSendRespuesta";

interface Props {
  idPregunta: string;
}

export const AddRespuesta = ({ idPregunta }: Props) => {
  const [titleRespuesta, setTitleRespuesta] = useState("");
  const dispatch = useAppDispatch();

  const { isUpdating } = useAppSelector((state) => state.entries);

  const handleAddRespuesta = () => {
    titleRespuesta.length > 0 &&
      dispatch(startNewRespuesta(titleRespuesta, idPregunta));
    setTitleRespuesta("");
  };
  return (
    <>
      <div className={styles.addRespuesta}>
        <textarea
          maxLength={100}
          value={titleRespuesta}
          onChange={(e) => setTitleRespuesta(e.target.value)}
          rows={10}
          placeholder="Escribí acá tu respuesta"
        />
        <button
          disabled={isUpdating}
          className={styles.addRespuesta__button}
          onClick={handleAddRespuesta}
        >
          <IconSendRespuesta size="25" color="#000" />
        </button>
      </div>
    </>
  );
};
