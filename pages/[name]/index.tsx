import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { Header } from "../../components/ui/Header/Header";
import { BiMessageDetail } from "react-icons/bi";
import Head from "next/head";

import styles from "./Name.module.scss";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { startLoadingPreguntasByUserName } from "../../store/entries";
import { PreguntaCard } from "../../components/Elements/PreguntaCard/PreguntaCard";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { ListaSavedPreguntas } from "../../components/Elements/ListaSavedPreguntas/ListaSavedPreguntas";
import { IPregunta } from "../../types/IPregunta";
import { ListaPreguntasByUserName } from "../../components/Elements/ListaPreguntasByUserName/ListaPreguntasByUserName";
import { loadUserIdByUserName } from "../../helpers/LoadUserIdByUserName";
import Modal from "../../components/ui/Modal/Modal";
import { Toast } from "../../components/StyledComponents/Toast.styled";

interface Props {
  name: string;
  dataUser: {
    uid: string;
    admin: string;
    displayName: string;
    email: string;
    id: string;
    mensajes: string;
    nickName: string;
    photoURL: string;
    preguntasGuardadas: [object];
    preguntasLikeadas: [string];
  };
}

const UserNickName = ({ name, dataUser }: Props) => {
  const status = useCheckAuth();

  const {
    uid,
    admin,
    displayName,
    email,
    id,
    mensajes,
    nickName,
    photoURL,
    preguntasGuardadas,
    preguntasLikeadas,
  } = dataUser;

  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSendMessage = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Head>
        <title>Perfil de {name} en Atención al lector</title>
        <meta name="description" content="Atención al lector" />
      </Head>
      <Header />
      <main className={styles.nameContainer}>
        <div className={styles.nameContainer__left}>
          email: {email} <br />
          UID: {uid} <br />
          display: {displayName} <br />
        </div>
        <div className={styles.nameContainer__main}>
          <ListaPreguntasByUserName name={name} />
        </div>
        <div className={styles.nameContainer__right}>
          <button onClick={handleSendMessage}>
            Enviar mensaje <BiMessageDetail />
          </button>
        </div>
        {isOpen && (
          <Modal
            setIsOpen={setIsOpen}
            uid={uid}
            messageTo={displayName}
            setShowToast={setShowToast}
          />
        )}
        {showToast && (
          <Toast
            className="animate__animated animate__fadeInUp animate__faster"
            color="success"
          >
            ¡Mensaje enviado!
          </Toast>
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { name } = params as { name: string };
  const dataUser = await loadUserIdByUserName({ name });
  return {
    props: {
      name,
      dataUser,
    },
  };
};

export default UserNickName;
