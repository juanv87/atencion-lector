import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingPreguntasByUserName } from "../../../store/entries";
import { IPregunta } from "../../../types/IPregunta";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";

export const ListaPreguntasByUserName = ({ name }: { name: string }) => {
  const { uid } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    uid && dispatch(startLoadingPreguntasByUserName({ name: name }));
  }, [uid]);

  const { preguntasByUserName } = useAppSelector((state) => state.entries);
  return (
    <>
      {preguntasByUserName.map((pregunta: IPregunta) => {
        return <PreguntaCard key={pregunta.id} pregunta={pregunta} />;
      })}
    </>
  );
};