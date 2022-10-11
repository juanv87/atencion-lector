import React, { useEffect } from "react";
import ContainerPerfil from "../../../components/Containers/ContainerPerfil/ContainerPerfil";
import { ListaPreguntas } from "../../../components/Elements/ListaPreguntas/ListaPreguntas";
import { ListaPreguntasByUserName } from "../../../components/Elements/ListaPreguntasByUserName/ListaPreguntasByUserName";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingPreguntasByUserName } from "../../../store/entries";
import { ListaPreguntasByUserProfile } from "../../../components/Elements/ListaPreguntasByUserProfile/ListaPreguntasByUserProfile";

const MisPreguntas = () => {
  return (
    <ContainerPerfil>
      <h1>Mis Preguntas</h1>
      <ListaPreguntasByUserProfile />
    </ContainerPerfil>
  );
};

export default MisPreguntas;
