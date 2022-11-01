import React, { useRef, useState } from "react";
import styles from "./AddRespuesta.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startNewRespuesta } from "../../../store/entries";
import { IconSendRespuesta } from "../../Icons/IconSendRespuesta";
import { startGoogleSignIn } from "../../../store/auth";

interface Props {
  idPregunta: string;
}

export const AddRespuesta = ({ idPregunta }: Props) => {
  const [titleRespuesta, setTitleRespuesta] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch();

  const { isUpdating } = useAppSelector((state) => state.entries);
  const { status } = useAppSelector((state) => state.auth);

  const handleAddRespuesta = () => {
    status === "authenticated" && titleRespuesta.length > 0
      ? dispatch(startNewRespuesta(titleRespuesta, idPregunta))
      : dispatch(startGoogleSignIn());
    setTitleRespuesta("");
  };
  return (
    <>
      <div className={`${styles.addRespuesta} ${active && styles.active}`}>
        <textarea
          maxLength={100}
          value={titleRespuesta}
          onChange={(e) => setTitleRespuesta(e.target.value)}
          onClick={() => setActive(true)}
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
