import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingFeed } from "../../../store/feed";
import { IPregunta } from "../../../types/IPregunta";
import { Pregunta } from "../Pregunta/Pregunta";
import styles from "./ListaFeed.module.scss";

export const ListaFeed = () => {
  const dispatch = useAppDispatch();
  const { preguntas, isLoadingFeed } = useAppSelector((state) => state.feed);
  useEffect(() => {
    dispatch(startLoadingFeed());
  }, []);
  console.log("Feed", preguntas);
  return (
    <>
      {isLoadingFeed && <div className="">Cargando...</div>}
      <section className={styles.listaFeed}>
        {preguntas.map((pregunta: IPregunta) => (
          <Pregunta key={pregunta.id} pregunta={pregunta} />
        ))}
      </section>
    </>
  );
};
