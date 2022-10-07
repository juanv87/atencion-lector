import ContainerPerfil from "../../components/Containers/ContainerPerfil/ContainerPerfil";

const Perfil = () => {
  return <ContainerPerfil>dasdas</ContainerPerfil>;
};

export default Perfil;

export async function getServerSideProps() {
  // Check if the user is logged in
  return {
    props: {}, // will be passed to the page component as props
  };
}
