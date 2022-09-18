import React from "react";
import { useAppSelector } from "../../../hooks";
import { IPregunta } from "../../../types/IPregunta";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";
import styles from "./ListaPreguntas.module.scss";
export const ListaPreguntas = () => {
  const { preguntas, isLoadingPreguntas } = useAppSelector(
    (state) => state.entries
    );
  console.log("🚀 ~ file: ListaPreguntas.tsx ~ line 9 ~ ListaPreguntas ~ isLoadingPreguntas", isLoadingPreguntas)
  return (
    <>
      <section className={styles.listaPreguntas}>
        {isLoadingPreguntas && <LoadingSpinner />}
        {preguntas &&
          preguntas.length > 1 &&
          preguntas.map((pregunta: IPregunta) => (
            <PreguntaCard key={pregunta.id} pregunta={pregunta} />
          ))}
      </section>
    </>
  );
};
