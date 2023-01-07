import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingPreguntasByUserName } from "../../../store/entries";
import { IPregunta } from "../../../types/IPregunta";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";

export const ListaPreguntasByUserName = ({ name }: { name: string }) => {
  const { isLoading, error, data } = useQuery("tweetsByName", () =>
    fetch(`${process.env.NEXT_PUBLIC_URL_PROD}/api/preguntas/${name}`).then((res) =>
      res.json()
    )
  );
  return (
    <>
      {
        isLoading && (
          <LoadingSpinner />
        )
      }
      {
        error && "Algo salió mal"
      }
      {data?.preguntas?.map((pregunta: IPregunta) => {
        return <PreguntaCard key={pregunta.id} pregunta={pregunta} />;
      })}
    </>
  );
};
