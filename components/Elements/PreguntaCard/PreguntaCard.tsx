import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  startRemovingSavedPregunta,
  startSavingPregunta,
  updateTitle,
  updateValidada,
} from "../../../store/entries";
import { updateLikes } from "../../../store/likedByUser";
import styles from "./Pregunta.module.scss";
import { IPregunta } from "../../../types/IPregunta";
import { AddRespuesta } from "../../User/AddRespuesta/AddRespuesta";
import { AutorAvatar } from "../AutorAvatar/AutorAvatar";
import { ListaRespuestas } from "../ListaRespuestas/ListaRespuestas";
import { MouseEvent, useEffect, useState } from "react";
import { IconBtnSave } from "../../Icons/IconBtnSave";
import { IconShowRespuestas } from "../../Icons/IconShowRespuestas";
import { checkSavedPregunta } from "../../../helpers/checkSavedPregunta";
import { IconBtnSaved } from "../../Icons/IconBtnSaved";
import { setUpdatedSaved } from "../../../store/savedByUser/savedByUserSlice";
import { loadSavedPreguntasByUser } from "../../../services/loadSavedPreguntasByUser";
import useDelete from "../../../hooks/useDelete";
import useSave from "../../../hooks/useSave";
import IconLike from "../../Icons/IconLike";
import { addToLiked } from "../../../store/likedByUser/likedByUser";
import { IconValidateOn } from "../../Icons/IconValidateOn";
import { IconValidateOf } from "../../Icons/IconValidateOf";
import IconEdit from "../../Icons/IconEdit";
import { ButtonPrimary } from "../../StyledComponents/ButtonPrimary.styled";

interface Props {
  pregunta: IPregunta;
}

export const PreguntaCard = ({ pregunta }: Props) => {
  const dispatch = useAppDispatch();
  const { updatedSaved, savedPreguntasByUser } = useAppSelector(
    (state) => state.savedByUser
  );
  const {
    user: { likedPreguntas },
  } = useAppSelector((state) => state.likedByUser);
  const { id, titulo, autor, respuestas, validada } = pregunta;

  const [showRespuestas, setShowRespuestas] = useState(false);
  const [savingPregunta, setSavingPregunta] = useState(false);
  const [savedPregunta, setSavedPregunta] = useState(false);
  const [activeLike, setActiveLike] = useState(false);
  const [updatedTitle, setUpdateTitle] = useState(titulo);
  const [showEdit, setShowEdit] = useState(false);

  const { uid, admin } = useAppSelector((state) => state.auth);

  const { onDeleteSavedPregunta } = useDelete({
    pregunta,
    setSavedPregunta,
    setUpdatedSaved,
    updatedSaved,
    savedPregunta,
  });
  const { onSavePregunta } = useSave({
    pregunta,
    setSavingPregunta,
    setSavedPregunta,
    updatedSaved,
  });

  const onShowRespuestas = (e: MouseEvent) => {
    e.preventDefault();
    setShowRespuestas(!showRespuestas);
  };

  const checkIfSaved = async () => {
    const isSaved = uid && (await checkSavedPregunta({ id, uid }));
    setSavedPregunta(isSaved ? true : false);
  };

  const handleLike = () => {
    dispatch(updateLikes(pregunta.id, likedPreguntas, uid)); // Agrega los likes de la preg. a Firestore y al store de Redux
  };

  const handleValidar = () => {
    dispatch(updateValidada(pregunta.id, !validada));
  };

  const handleEditTitle = () => {
    dispatch(updateTitle(pregunta.id, updatedTitle));
  };

  useEffect(() => {
    uid && checkIfSaved();
    setShowRespuestas(true);
  }, [savedPreguntasByUser]);

  useEffect(() => {
    // Setea el svg del like en pintado o no
    let alreadyLiked =
      likedPreguntas.filter((liked) => liked === pregunta.id).length > 0;
    alreadyLiked ? setActiveLike(true) : setActiveLike(false);
  }, [likedPreguntas]);

  return (
    <>
      <article
        className={`${styles.tarjetaPregunta} animate__fadeInUp animate__animated animate__faster`}
      >
        <div className={styles.header}>
          <AutorAvatar autor={autor} />
          <div className={styles.tools}>
            {admin && (
              <div onClick={handleValidar} className={styles.validada}>
                {validada ? (
                  <IconValidateOn color="green" />
                ) : (
                  <IconValidateOf />
                )}
              </div>
            )}
            {admin && (
              <button
                onClick={() => setShowEdit(!showEdit)}
                className={styles.editButton}
              >
                <IconEdit />
              </button>
            )}
            {uid && (
              <button
                className={styles.buttonSave}
                onClick={
                  !savedPregunta ? onSavePregunta : onDeleteSavedPregunta
                }
              >
                {savedPregunta ? (
                  <IconBtnSaved />
                ) : (
                  <IconBtnSave color={savingPregunta ? "red" : "black"} />
                )}
              </button>
            )}
          </div>
        </div>
        <h2 className={styles.title}>{titulo}</h2>
        {showEdit && (
          <>
            <div className={styles.titleEditContainer}>
              <textarea
                onChange={(e) => setUpdateTitle(e.target.value)}
                name="titulo"
                value={updatedTitle || titulo}
                id=""
                className={styles.inputEdit}
              />
              <div className={styles.btnsContainer}>
                <ButtonPrimary onClick={handleEditTitle}>
                  Aceptar edición
                </ButtonPrimary>
                <ButtonPrimary onClick={() => setShowEdit(!showEdit)}>
                  Cancelar edición
                </ButtonPrimary>
              </div>
            </div>
          </>
        )}
        <AddRespuesta idPregunta={id} />
        <div className={styles.likes}>
          <button onClick={handleLike}>
            <IconLike size={18} activeLike={activeLike} />
          </button>
          <span>{pregunta.likes}</span>
        </div>

        {respuestas.length > 0 ? (
          <button
            className={styles.buttonShowRespuestas}
            onClick={onShowRespuestas}
          >
            <IconShowRespuestas />
            <span>
              {showRespuestas
                ? "Ocultar respuestas"
                : `Ver respuestas (${respuestas?.length})`}
            </span>
          </button>
        ) : (
          <p className={styles.sinRespuestas}>Todavía no hay respuestas</p>
        )}
        {showRespuestas && id && <ListaRespuestas respuestas={respuestas} />}
      </article>
    </>
  );
};
