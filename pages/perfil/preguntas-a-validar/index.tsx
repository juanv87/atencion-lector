import React from "react";
import ContainerPerfil from "../../../components/Containers/ContainerPerfil/ContainerPerfil";
import { ListaPreguntasAValidar } from "../../../components/Elements/ListaPreguntasAValidar/ListaPreguntasAValidar";

const PreguntasGuardadas = () => {
  return (
    <ContainerPerfil>
      <h1>Preguntas a validar</h1>
      <ListaPreguntasAValidar />
    </ContainerPerfil>
  );
};

export default PreguntasGuardadas;
