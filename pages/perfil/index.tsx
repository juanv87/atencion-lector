import ContainerPerfil from "../../components/Containers/ContainerPerfil/ContainerPerfil";
import { ListaTweetsByUserProfile } from "../../components/Elements/ListaTweetsByUserProfile/ListaTweetsByUserProfile";
import AboutMe from "../../components/User/AboutMe/AboutMe";
import { AddTweet } from "../../components/User/AddTweet/AddTweet";
import { useAppSelector } from "../../hooks";
import styles from "./Perfil.module.scss";
const Perfil = () => {
  const { displayName, email, nickName, uid } = useAppSelector(
    (state) => state.auth
  );

  return (
    <>
      <ContainerPerfil>
        <h1>Mi Perfil</h1>
        <div className={styles.datos}>
          <div className={styles.item}>
            <p><strong>Nombre: </strong>{displayName}</p>
            <p><strong>Email: </strong>{email}</p>
            <p><strong>Nombre de usuario: </strong>{nickName}</p>
          </div>
          <AboutMe />
          <AddTweet />
          <ListaTweetsByUserProfile nickName={nickName || ""} />
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
