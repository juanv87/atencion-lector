import { IPregunta } from "../types/IPregunta";
import { loadSavedPreguntasByUser } from "../services/loadSavedPreguntasByUser";

interface Props {
  id: string;
  uid: string;
}

export const checkSavedPregunta = async ({ id, uid }: Props) => {
  const savedPreguntas = uid && (await loadSavedPreguntasByUser({ uid }));
  const preguntasGuardadas = savedPreguntas?.map(
    (pregunta: IPregunta) => pregunta.id
  );
  const isSaved = preguntasGuardadas?.includes(id);
  return isSaved;
};
