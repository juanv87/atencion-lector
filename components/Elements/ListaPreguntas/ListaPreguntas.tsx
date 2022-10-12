import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getLikedByUser } from "../../../store/likedByUser/thunks";
import { IPregunta } from "../../../types/IPregunta";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";
import styles from "./ListaPreguntas.module.scss";

export const ListaPreguntas = () => {
  const dispatch = useAppDispatch()
  const { preguntas, isLoadingPreguntas } = useAppSelector(
    (state) => state.entries
    );
  const { uid } = useAppSelector((state) => state.auth);
  
  useEffect(()=>{
    uid && dispatch(getLikedByUser(uid))
  }, [uid])
  return (
    <>
      <section className={styles.listaPreguntas}>
        {isLoadingPreguntas && <LoadingSpinner />}
        {preguntas &&
          preguntas.length > 1 &&
          preguntas.filter((pregunta) => pregunta.validada === true).map((pregunta: IPregunta) => (
            <PreguntaCard key={pregunta.id} pregunta={pregunta} />
          ))}
      </section>
    </>
  );
};
