import { useAppDispatch, useAppSelector } from "../../../hooks";

import styles from "./TweetCard.module.scss";
import { AutorAvatar } from "../AutorAvatar/AutorAvatar";
import { useState } from "react";
import { ButtonPrimary } from "../../StyledComponents/ButtonPrimary.styled";
import { ITweet } from "../../../types/ITweet";
import { updateBody } from "../../../store/tweets";
import IconEdit from "../../Icons/IconEdit";

interface Props {
  tweet: ITweet;
}

export const TweetCard = ({ tweet }: Props) => {
  const dispatch = useAppDispatch();

  const { id, body, autor } = tweet;

  const [updatedBody, setUpdateBody] = useState(body);
  const [showEdit, setShowEdit] = useState(false);

  const { uid, admin } = useAppSelector((state) => state.auth);

  const handleEditBody = () => {
    dispatch(updateBody(tweet.id, updatedBody));
  };

  return (
    <>
      <article
        className={`${styles.tarjetaTweet} animate__fadeInUp animate__animated animate__faster`}
      >
        <div className={styles.header}>
          <AutorAvatar autor={autor} />
          <div className={styles.tools}>
            {admin && (
              <button
                onClick={() => setShowEdit(!showEdit)}
                className={styles.editButton}
              >
                <IconEdit />
              </button>
            )}
          </div>
        </div>
        {!showEdit && <p className={styles.body}>{body}</p>}
        {showEdit && (
          <>
            <div className={styles.titleEditContainer}>
              <textarea
                onChange={(e) => setUpdateBody(e.target.value)}
                name="body"
                value={updatedBody || body}
                id=""
                className={styles.inputEdit}
              />
              <div className={styles.btnsContainer}>
                <ButtonPrimary onClick={handleEditBody}>
                  Aceptar edición
                </ButtonPrimary>
                <ButtonPrimary onClick={() => setShowEdit(!showEdit)}>
                  Cancelar edición
                </ButtonPrimary>
              </div>
            </div>
          </>
        )}
      </article>
    </>
  );
};
