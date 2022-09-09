import React, { useEffect, useState } from "react";
import { loadRespuestasById } from "../../../helpers/loadRespuestasById";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingRespuestas } from "../../../store/entries";
import { Respuesta } from "../Respuesta/Respuesta";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import styles from "./Respuestas.module.scss";

export const Respuestas = ({ preguntaId = "" }) => {
  // Todo: Revisar si es eficiente traer todas las preguntas para obtener el id actual y traer las respuestas del store.
  const { preguntas, isLoadingRespuestas } = useAppSelector(
    (state) => state.entries
  );
  // Busco la posición de la pregunta actual en la lista de preguntas
  const index = preguntas.findIndex((preg) => preg.id === preguntaId);
  // Traigo las respuestas de la pregunta actual
  const { respuestas } = useAppSelector(
    (state) => state.entries.preguntas[index]
  );

  // * O traer las respuestas de la pregunta actual. Esto no actualiza el componente.

  // const [respuestas, setRespuestas] = useState([] as any[]);

  // const handleGetRespuestas = async () => {
  //   const respuestas = await loadRespuestasById(preguntaId);
  //   console.log("respuestas", { respuestas });
  //   setRespuestas(respuestas);
  // };
  const dispatch = useAppDispatch();
  useEffect(() => {
    // handleGetRespuestas();
    dispatch(startLoadingRespuestas(preguntaId));
  }, []);
  return (
    <section className={styles.respuestasContainer}>
      {isLoadingRespuestas && <LoadingSpinner />}
      {respuestas.length > 0 &&
        respuestas.map(({ id, titulo, autor }) => (
          <Respuesta key={id} titulo={titulo} autor={autor} />
        ))}
    </section>
  );
};
