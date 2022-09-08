import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingRespuestas } from "../../../store/entries";
import styles from "./Pregunta.module.scss";
import { IPregunta } from "../../../types/IPregunta";
import { AddRespuesta } from "../../User/AddRespuesta/AddRespuesta";
import { AutorAvatar } from "../AutorAvatar/AutorAvatar";
import { Respuestas } from "../Respuestas/Respuestas";

interface Props {
  pregunta: IPregunta;
}

export const Pregunta = ({ pregunta }: Props) => {
  const dispatch = useAppDispatch();
  const { id, titulo, autor } = pregunta;
  const { isLoadingRespuestas } = useAppSelector((state) => state.entries);

  const onGetRespuestas = () => {
    dispatch(startLoadingRespuestas(id));
  };

  return (
    <>
      <article
        className={`${styles.tarjetaPregunta} animate__fadeInUp animate__animated animate__faster`}
      >
        <AutorAvatar autor={autor} />
        <h2 className={styles.tarjetaPregunta__title}>{titulo}</h2>
        <AddRespuesta idPregunta={id} />
        <button
          className={styles.tarjetaPregunta__button}
          onClick={onGetRespuestas}
        >
          {isLoadingRespuestas ? "Cargando respuestas..." : "Ver respuestas"}
        </button>
        <Respuestas preguntaId={pregunta.id} />
      </article>
    </>
  );
};
