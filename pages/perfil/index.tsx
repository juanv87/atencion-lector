import ContainerPerfil from "../../components/Containers/ContainerPerfil/ContainerPerfil";
import { useAppSelector } from "../../hooks";
import styles from "./Perfil.module.scss";
const Perfil = () => {
  const { displayName, email, nickName } = useAppSelector((state) => state.auth);
  return (
    <>
      <ContainerPerfil>
        <h1>Mis datos</h1>
        <div className={styles.datos}>
          <div className={styles.item}>
            <p>Nombre: {displayName}</p>
            <p>Email: {email}</p>
            <p>Nombre de usuario: {nickName}</p>
          </div>
        </div>
      </ContainerPerfil>
    </>
  );
};

export default Perfil;

export async function getServerSideProps() {
  // Check if the user is logged in
  return {
    props: {}, // will be passed to the page component as props
  };
}
