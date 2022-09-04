import React from "react";
import { useAppSelector } from "../../../hooks";
import { IPregunta } from "../../../types/IPregunta";
import { listaPreguntasMock } from "../../../__mock__/listaPreguntasMock";
import { Pregunta } from "../Pregunta";
import styles from "./ListaPreguntas.module.scss";
export const ListaPreguntas = () => {
  const { preguntas } = useAppSelector((state) => state.entries);
  return (
    <>
      <section className={styles.listaPreguntas}>
        {preguntas.map((pregunta: IPregunta) => (
          <Pregunta key={pregunta.id} pregunta={pregunta} />
        ))}
      </section>
    </>
  );
};
