import React from "react";
import { useAppSelector } from "../../../hooks";
import { IPregunta } from "../../../types/IPregunta";
import { listaPreguntasMock } from "../../../__mock__/listaPreguntasMock";
import { Pregunta } from "../Pregunta/Pregunta";
import styles from "./ListaPreguntas.module.scss";
export const ListaPreguntas = () => {
  const { preguntas, isLoadingPreguntas } = useAppSelector(
    (state) => state.entries
  );
  return (
    <>
      {isLoadingPreguntas && "Cargando preguntas..."}
      <section className={styles.listaPreguntas}>
        {preguntas.length > 1 &&
          preguntas.map((pregunta: IPregunta) => (
            <Pregunta key={pregunta.id} pregunta={pregunta} />
          ))}
      </section>
    </>
  );
};
