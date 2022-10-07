import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
// import { startLoadingRespuestas } from "../../../store/entries";
import { RespuestaCard } from "../RespuestaCard/RespuestaCard";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import styles from "./Respuestas.module.scss";
import { IRespuesta } from "../../../types/IRespuesta";

interface Props {
  respuestas: IRespuesta[];
}

export const ListaRespuestas = ({ respuestas }: Props) => {

  const [ paginate, setPaginate ] = useState(3)

  const handlePaginatePlus = () => {
    setPaginate( prev => prev + 3)
  }
  const handlePaginateMinus = () => {
    setPaginate( prev => prev - 3)
  }
  return (
    <section className={styles.respuestasContainer}>
      {respuestas &&
        respuestas.slice(0,paginate).map(({ id, titulo, autor }) => (
          <RespuestaCard key={id} titulo={titulo} autor={autor} />
        ))}
        <div className={styles.verMasMenos}>
          {
            paginate <= respuestas.length && (
              <button 
              className="respuestasContainer__button--mas"
              onClick={handlePaginatePlus}
              >Ver Más</button>
            )
          }
          {
            paginate > 3 &&
          <button 
          className="respuestasContainer__button--menos"
          onClick={handlePaginateMinus}
          >Ver Menos</button>
          }

        </div>
    </section>
  );
};
