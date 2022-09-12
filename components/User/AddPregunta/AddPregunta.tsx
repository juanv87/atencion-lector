import React, { ChangeEvent, MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startNewPregunta } from "../../../store/entries";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import styles from "./AddPregunta.module.scss";
export const AddPregunta = () => {
  const [titlePregunta, setTitlePregunta] = useState("");
  const dispatch = useAppDispatch();

  const { isSaving } = useAppSelector((state) => state.entries);

  const onClickNewPregunta = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // titlePregunta.length > 0 && dispatch(startNewPregunta({ titlePregunta }));
    titlePregunta.length > 0 && dispatch(startNewPregunta({ titlePregunta }));
    setTitlePregunta("");
  };
  return (
    <>
      <div className={styles.addPregunta}>
        <form className={styles.addPregunta__form}>
          <div className={styles.addPregunta__form__avatarTextArea}>
            <UserAvatar showName={false} showLogOut={false} />
            <div className={styles.textAreaContainer}>
              <textarea
                maxLength={200}
                value={titlePregunta}
                onChange={(e) => setTitlePregunta(e.target.value)}
                rows={10}
                placeholder="Escribí acá tu pregunta"
              />
              <p>{titlePregunta.length} / 200</p>
            </div>
          </div>
          <button
            disabled={isSaving}
            onClick={(e) => onClickNewPregunta(e)}
            className={styles.addPregunta__form__button}
          >
            {isSaving ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </>
  );
};
