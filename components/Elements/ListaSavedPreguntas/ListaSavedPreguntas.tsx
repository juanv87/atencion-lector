import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingSavedPreguntasByUser } from "../../../store/entries";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";
import { SavedPregunta } from "../SavedPregunta/SavedPregunta";
import styles from "./ListaSavedPreguntas.module.scss";
import {loadSavedPreguntasByUser} from '../../../services/loadSavedPreguntasByUser'

interface Props {
  status: string;
}

export const ListaSavedPreguntas = ({ status }: Props) => {
  const dispatch = useAppDispatch();
  const { savedPreguntasByUser } = useAppSelector((state) => state.entries);
  console.log("🚀 ~ file: ListaSavedPreguntas.tsx ~ line 16 ~ ListaSavedPreguntas ~ savedPreguntasByUser", savedPreguntasByUser)
  const { uid, email } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    status === "authenticated" && dispatch(startLoadingSavedPreguntasByUser());
  }, [status]);

  // useEffect(()=>{
  //   loadSavedPreguntasByUser(uid)
  // }, [])

  return (
    <>
      <section className={styles.listaSavedPreguntas}>
        <h2>Tus preguntas guardadas:</h2>
        {savedPreguntasByUser && savedPreguntasByUser[0]?.id.length > 0 ? (
          savedPreguntasByUser.map((pregunta) => {
            return <SavedPregunta key={pregunta.id} pregunta={pregunta} />;
          })
        ) : (
          <p>No hay preguntas guardadas</p>
        )}
      </section>
    </>
  );
};
