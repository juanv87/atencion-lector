import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getLikedByUser } from "../../../store/likedByUser/thunks";
import { IPregunta } from "../../../types/IPregunta";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";
import styles from "./ListaPreguntas.module.scss";
import { useQuery } from "react-query";

export const ListaPreguntas = ({ query }: { query: String }) => {
  const dispatch = useAppDispatch();

  const { isLoading, error, data } = useQuery("listPreguntas", () =>
    fetch(`${process.env.NEXT_PUBLIC_URL_PROD}/api/preguntas`).then((res) =>
      res.json()
    )
  );

  const { uid } = useAppSelector((state) => state.auth);

  const [validadas, setValidadas] = useState(data?.preguntas);
  const [filtradas, setFiltradas] = useState(validadas);

  useEffect(() => {
    uid && dispatch(getLikedByUser(uid));
  }, [uid]);

  useEffect(() => {
    let validated = data?.preguntas.filter(
      (pregunta: IPregunta) => pregunta.validada === true
    );
    setValidadas(validated);
  }, [data?.preguntas]);

  useEffect(() => {
    setFiltradas(
      validadas?.filter((preg: IPregunta) =>
        preg.titulo.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, validadas]);

  const [paginate, setPaginate] = useState(6);

  const handlePaginatePlus = () => {
    setPaginate((prev) => prev + 6);
  };
  const handlePaginateMinus = () => {
    setPaginate((prev) => prev - 6);
  };

  return (
    <>
      <section className={styles.listaPreguntas}>
        {isLoading && <LoadingSpinner />}
        {filtradas?.slice(0, paginate).map((pregunta: IPregunta) => (
          <PreguntaCard key={pregunta.id} pregunta={pregunta} />
        ))}
        <div className={styles.verMasMenos}>
          {paginate <= filtradas?.length && (
            <button
              className={styles.buttonVerMas}
              onClick={handlePaginatePlus}
            >
              Ver Más
            </button>
          )}
          {paginate > 6 && (
            <button
              className={styles.buttonVerMenos}
              onClick={handlePaginateMinus}
            >
              Ver Menos
            </button>
          )}
        </div>
      </section>
    </>
  );
};
