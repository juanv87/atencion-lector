import React from "react";
import ContainerPerfil from "../../../components/Containers/ContainerPerfil/ContainerPerfil";
import { ListaSavedPreguntas } from "../../../components/Elements/ListaSavedPreguntas/ListaSavedPreguntas";
import { useAppSelector } from "../../../hooks";

const PreguntasGuardadas = () => {
  const { status } = useAppSelector((state) => state.auth);
  return (
    <ContainerPerfil>
      <h1>Preguntas guardadas</h1>
      <ListaSavedPreguntas status={status} />
    </ContainerPerfil>
  );
};

export default PreguntasGuardadas;
