import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  addToLikedByUser,
  getLikedByUser,
  likePregunta,
  startRemovingSavedPregunta,
  startSavingPregunta,
  updateLikes,
} from "../../../store/entries";
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

interface Props {
  pregunta: IPregunta;
}

export const PreguntaCard = ({ pregunta }: Props) => {
  const dispatch = useAppDispatch()
  const { updatedSaved , savedPreguntasByUser } = useAppSelector((state) => state.savedByUser);
  const { user: {likedPreguntas} } = useAppSelector((state) => state.likedByUser);

  console.log('likedPreguntas', likedPreguntas)

  const [showRespuestas, setShowRespuestas] = useState(false);
  const [savingPregunta, setSavingPregunta] = useState(false);
  const [savedPregunta, setSavedPregunta] = useState(false);
  const [ activeLike, setActiveLike ] = useState(false)

  const { uid } = useAppSelector((state) => state.auth);

  const { id, titulo, autor, respuestas } = pregunta;  

  const { onDeleteSavedPregunta } = useDelete({
    pregunta,
    setSavedPregunta,
    setUpdatedSaved,
    updatedSaved,
    savedPregunta
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
    // setActiveLike(!activeLike)
    let alreadyLiked = likedPreguntas.filter( liked => liked === pregunta.id).length > 0
    if(!alreadyLiked){
      dispatch(likePregunta(pregunta.id)) // Agrega los likes de la preg. al store de Redux
      dispatch(updateLikes(pregunta.id)) // Agrega los likes de la preg. a Firestore
      dispatch(addToLikedByUser(uid, pregunta.id))
    }
  }

  useEffect(() => {
    uid && checkIfSaved();
    setShowRespuestas(true);
  }, [savedPreguntasByUser]);

  useEffect(()=>{
    let alreadyLiked = likedPreguntas.filter( liked => liked === pregunta.id).length > 0
    alreadyLiked && setActiveLike(true)
  }, [likedPreguntas])
  

  return (
    <>
      <article
        className={`${styles.tarjetaPregunta} animate__fadeInUp animate__animated animate__faster`}
      >
        <AutorAvatar autor={autor} />
        <h2 className={styles.title}>{titulo}</h2>
        <AddRespuesta idPregunta={id} />
        <button onClick={handleLike}>
          <IconLike size={18} activeLike={activeLike}/>
        </button>
        <span>{pregunta.likes}</span>
        {uid && (
          <button
            className={styles.buttonSave}
            onClick={!savedPregunta ? onSavePregunta : onDeleteSavedPregunta}
          >
            {savedPregunta ? (
              <IconBtnSaved />
            ) : (
              <IconBtnSave color={savingPregunta ? "red" : "black"} />
            )}
          </button>
        )}

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
