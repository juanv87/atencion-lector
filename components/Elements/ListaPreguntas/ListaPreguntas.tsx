import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getLikedByUser } from "../../../store/likedByUser/thunks";
import { IPregunta } from "../../../types/IPregunta";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";
import styles from "./ListaPreguntas.module.scss";

export const ListaPreguntas = ({ query }: { query: String }) => {
  const dispatch = useAppDispatch();
  const { preguntas, isLoadingPreguntas } = useAppSelector(
    (state) => state.entries
  );
  const { uid } = useAppSelector((state) => state.auth);

  const [validadas, setValidadas] = useState(preguntas);
  const [filtradas, setFiltradas] = useState(validadas);

  console.log("filtradas", filtradas);

  useEffect(() => {
    uid && dispatch(getLikedByUser(uid));
  }, [uid]);

  useEffect(() => {
    let validated = preguntas.filter((pregunta) => pregunta.validada === true);
    setValidadas(validated);
  }, [preguntas]);

  useEffect(() => {
    setFiltradas(
      validadas.filter((preg) =>
        preg.titulo.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, validadas]);
  return (
    <>
      <section className={styles.listaPreguntas}>
        {isLoadingPreguntas && <LoadingSpinner />}
        {filtradas.length > 0 ? (
          filtradas.map((pregunta: IPregunta) => (
            <PreguntaCard key={pregunta.id} pregunta={pregunta} />
          ))
        ) : (
          <span>No se encontraron resultados para tu búsqueda</span>
        )}
      </section>
    </>
  );
};
