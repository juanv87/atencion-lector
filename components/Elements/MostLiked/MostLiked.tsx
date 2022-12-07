import React from "react";
import { useAppSelector } from "../../../hooks";
import styles from "./MostLiked.module.scss";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import { IPregunta } from "../../../types/IPregunta";
import { SideCard } from "../SideCard/SideCard";

const MostLiked = () => {
  const { preguntas, isLoadingPreguntas } = useAppSelector(
    (state) => state.entries
  );

  const sorted = [...preguntas];

  const mostLiked = sorted.sort((a, b) => {
    let x = a.likes,
      y = b.likes;
    return x < y ? 1 : x > y ? -1 : 0;
  });

  return (
    <>
      <section className={styles.mostLiked}>
        <div className={styles.mostLikedContainer}>
          <div className={styles.mostLikedTitle}>
            <h2>Top 5 de preguntas</h2>
          </div>
          {isLoadingPreguntas && (
            <>
              <div className={styles.spinner}>
                <LoadingSpinner />
              </div>
            </>
          )}
          {mostLiked.length > 1 &&
            mostLiked
              .slice(0, 5)
              .map((pregunta: IPregunta) => (
                <SideCard
                  key={pregunta.id}
                  pregunta={pregunta}
                  mostLiked={true}
                  saved={false}
                />
              ))}
        </div>
      </section>
    </>
  );
};

export default MostLiked;
