import ContainerPerfil from "../../../components/Containers/ContainerPerfil/ContainerPerfil";
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
