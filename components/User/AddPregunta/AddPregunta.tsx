import React, { ChangeEvent, MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startGoogleSignIn } from "../../../store/auth";
import { startNewPregunta } from "../../../store/entries";
import { ButtonPrimary } from "../../StyledComponents/ButtonPrimary.styled";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import styles from "./AddPregunta.module.scss";
import { Toast } from "../../StyledComponents/Toast.styled";

export const AddPregunta = () => {
  const [titlePregunta, setTitlePregunta] = useState("");
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.auth);
  const { isSaving } = useAppSelector((state) => state.entries);

  const [messagePost, setMessagePost] = useState("");

  const onClickNewPregunta = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // titlePregunta.length > 0 && dispatch(startNewPregunta({ titlePregunta }));
    status === "authenticated"
      ? titlePregunta.length > 0 &&
        dispatch(startNewPregunta({ titlePregunta })).then(() => {
          setMessagePost(
            "Pregunta enviada y lista para revisar, en breve podrás verla publicada."
          );
          setTitlePregunta("");
        })
      : dispatch(startGoogleSignIn());
    setTimeout(() => {
      setMessagePost("");
    }, 4500);
  };
  return (
    <>
      <div className={styles.addPregunta}>
        {messagePost.length > 0 && (
          <Toast
            className="animate__animated animate__fadeInUp animate__faster"
            color="success"
          >
            {messagePost}
          </Toast>
        )}
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
          <ButtonPrimary
            onClick={(e: MouseEvent<HTMLButtonElement>) =>
              onClickNewPregunta(e)
            }
            disabled={isSaving}
          >
            {isSaving ? "Enviando..." : "Enviar"}
          </ButtonPrimary>
        </form>
      </div>
    </>
  );
};
