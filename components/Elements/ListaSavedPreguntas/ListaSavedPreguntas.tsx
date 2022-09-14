import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingSavedPreguntasByUser } from "../../../store/entries";
import { Pregunta } from "../Pregunta/Pregunta";
import { SavedPregunta } from "../SavedPregunta/SavedPregunta";
import styles from "./ListaSavedPreguntas.module.scss";

interface Props {
  status: string;
}

export const ListaSavedPreguntas = ({ status }: Props) => {
  const dispatch = useAppDispatch();
  const { savedPreguntasByUser } = useAppSelector((state) => state.entries);

  useEffect(() => {
    status === "authenticated" && dispatch(startLoadingSavedPreguntasByUser());
  }, [status]);
  return (
    <>
      <section className={styles.listaSavedPreguntas}>
        <h2>Tus preguntas guardadas:</h2>
        {savedPreguntasByUser && savedPreguntasByUser.length > 0 ? (
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
