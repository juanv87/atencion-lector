import React, { ChangeEvent, MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startNewPregunta } from "../../../store/entries";
import styles from "./AddPregunta.module.scss";
export const AddPregunta = () => {
  const [titlePregunta, setTitlePregunta] = useState("");
  const dispatch = useAppDispatch();

  const { isSaving } = useAppSelector((state) => state.entries);

  const onClickNewPregunta = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // titlePregunta.length > 0 && dispatch(startNewPregunta({ titlePregunta }));
    titlePregunta.length > 0 && dispatch(startNewPregunta({ titlePregunta }));
  };
  return (
    <>
      <div className={styles.addPregunta}>
        <form className={styles.addPregunta__form}>
          <textarea
            onChange={(e) => setTitlePregunta(e.target.value)}
            rows={10}
            placeholder="Escribí acá tu pregunta"
          />
          <button
            disabled={isSaving}
            onClick={(e) => onClickNewPregunta(e)}
            className={styles.addPregunta__form__button}
          >
            {isSaving ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </>
  );
};
