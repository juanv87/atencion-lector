import React from "react";
import { useAppSelector } from "../../../hooks";
import { Respuesta } from "../Respuesta/Respuesta";

export const Respuestas = ({ preguntaId = "" }) => {
  // Todo: Revisar si es eficiente traer todas las preguntas para obtener el id actual y traer las respuestas del store.
  const { preguntas } = useAppSelector((state) => state.entries);
  // Busco la posición de la pregunta actual en la lista de preguntas
  const index = preguntas.findIndex((preg) => preg.id === preguntaId);
  // Traigo las respuestas de la pregunta actual
  const { respuestas } = useAppSelector(
    (state) => state.entries.preguntas[index]
  );
  return (
    <>
      {respuestas.length > 0 &&
        respuestas.map(({ id, titulo }) => (
          <Respuesta key={id} titulo={titulo} />
        ))}
    </>
  );
};
