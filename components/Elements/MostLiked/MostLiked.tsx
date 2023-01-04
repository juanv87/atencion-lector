import React from "react";
import { useAppSelector } from "../../../hooks";
import styles from "./MostLiked.module.scss";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import { IPregunta } from "../../../types/IPregunta";
import { SideCard } from "../SideCard/SideCard";
import { useQuery } from "react-query";

const MostLiked = () => {
  const { isLoading, error, data } = useQuery("listPreguntas", () =>
    fetch(`${process.env.NEXT_PUBLIC_URL_PROD}/preguntas/likes`).then((res) =>
      res.json()
    )
  );

  return (
    <>
      <section className={styles.mostLiked}>
        <div className={styles.mostLikedContainer}>
          <div className={styles.mostLikedTitle}>
            <h2>Las preguntas más likeadas</h2>
          </div>
          {isLoading && (
            <>
              <div className={styles.spinner}>
                <LoadingSpinner />
              </div>
            </>
          )}
          {data?.preguntas.length > 1 &&
            data?.preguntas
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
