import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingSavedPreguntasByUser } from "../../../store/entries";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";
import { SavedPregunta } from "../SavedPregunta/SavedPregunta";
import styles from "./ListaSavedPreguntas.module.scss";
import { loadSavedPreguntasByUser } from "../../../services/loadSavedPreguntasByUser";
import { setUpdatedSaved } from "../../../store/savedByUser/savedByUserSlice";

interface Props {
  status: string;
}

export const ListaSavedPreguntas = ({ status }: Props) => {
  const dispatch = useAppDispatch();
  const { savedPreguntasByUser, updatedSaved } = useAppSelector((state) => state.savedByUser);
  const { uid, email } = useAppSelector((state) => state.auth);

  useEffect(() => {
    status === "authenticated" && dispatch(startLoadingSavedPreguntasByUser());
    updatedSaved && dispatch(setUpdatedSaved(updatedSaved));
    console.log('updatedSaved', updatedSaved)
  }, [status, updatedSaved]);

  return (
    <>
      <section className={styles.listaSavedPreguntas}>
        <h2>Tus preguntas guardadas:</h2>
        {savedPreguntasByUser && savedPreguntasByUser[0]?.id.length > 0 ? (
          savedPreguntasByUser.map((pregunta) => {
            return <SavedPregunta key={pregunta.id} pregunta={pregunta} />;
          })
        ) : (
          <p>No hay preguntas guardadas</p>
        )}
      </section>
    </>
  );
};
