import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingPreguntasByUserName } from "../../../store/entries";
import { IPregunta } from "../../../types/IPregunta";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";

export const ListaPreguntasByUserProfile = () => {
  const { uid, nickName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    uid && dispatch(startLoadingPreguntasByUserName({ name: nickName }));
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
