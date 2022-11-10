import ContainerPerfil from "../../components/Containers/ContainerPerfil/ContainerPerfil";
import { ListaTweetsByUserProfile } from "../../components/Elements/ListaTweetsByUserProfile/ListaTweetsByUserProfile";
import { AddTweet } from "../../components/User/AddTweet/AddTweet";
import { useAppSelector } from "../../hooks";
import styles from "./Perfil.module.scss";
const Perfil = () => {
  const { displayName, email, nickName } = useAppSelector(
    (state) => state.auth
  );
  return (
    <>
      <ContainerPerfil>
        <h1>Mi Perfil</h1>
        <div className={styles.datos}>
          <div className={styles.item}>
            <p>Nombre: {displayName}</p>
            <p>Email: {email}</p>
            <p>Nombre de usuario: {nickName}</p>
          </div>
          <AddTweet />
          <ListaTweetsByUserProfile />
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
