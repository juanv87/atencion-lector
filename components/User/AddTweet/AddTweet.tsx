import React, { ChangeEvent, MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startGoogleSignIn } from "../../../store/auth";
import { startNewTweet } from "../../../store/tweets";
import { ButtonPrimary } from "../../StyledComponents/ButtonPrimary.styled";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import styles from "./AddTweet.module.scss";
import { Toast } from "../../StyledComponents/Toast.styled";

export const AddTweet = () => {
  const [bodyTweet, setBodyTweet] = useState("");
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.auth);
  const { isSaving } = useAppSelector((state) => state.tweets);

  const [messagePost, setMessagePost] = useState("");

  const onClickNewTweet = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // bodyTweet.length > 0 && dispatch(startNewTweet({ bodyTweet }));
    status === "authenticated"
      ? bodyTweet.length > 0 &&
        dispatch(startNewTweet({ bodyTweet })).then(() => {
          setMessagePost(
            "Nota enviada y lista para revisar, en breve podrás verla publicada."
          );
          setBodyTweet("");
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
                maxLength={1000}
                value={bodyTweet}
                onChange={(e) => setBodyTweet(e.target.value)}
                rows={10}
                placeholder="Escribí acá..."
              />
              <p>{bodyTweet.length} / 1000</p>
            </div>
          </div>
          <ButtonPrimary
            onClick={(e: MouseEvent<HTMLButtonElement>) => onClickNewTweet(e)}
            disabled={isSaving}
          >
            {isSaving ? "Enviando..." : "Enviar"}
          </ButtonPrimary>
        </form>
      </div>
    </>
  );
};
