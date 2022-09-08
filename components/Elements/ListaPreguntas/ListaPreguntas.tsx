import React from "react";
import { useAppSelector } from "../../../hooks";
import { IPregunta } from "../../../types/IPregunta";
import { Pregunta } from "../Pregunta/Pregunta";
import styles from "./ListaPreguntas.module.scss";
export const ListaPreguntas = () => {
  const { preguntas, isLoadingPreguntas } = useAppSelector(
    (state) => state.entries
  );
  return (
    <>
      <section className={styles.listaPreguntas}>
        {isLoadingPreguntas && "Cargando preguntas..."}
        {preguntas.length > 1 &&
          preguntas.map((pregunta: IPregunta) => (
            <Pregunta key={pregunta.id} pregunta={pregunta} />
          ))}
      </section>
    </>
  );
};
