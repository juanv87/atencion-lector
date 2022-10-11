import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { Header } from "../../components/ui/Header/Header";
import Head from "next/head";

import styles from "./Name.module.scss";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { startLoadingPreguntasByUserName } from "../../store/entries";
import { PreguntaCard } from "../../components/Elements/PreguntaCard/PreguntaCard";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { ListaSavedPreguntas } from "../../components/Elements/ListaSavedPreguntas/ListaSavedPreguntas";
import { IPregunta } from "../../types/IPregunta";
import { ListaPreguntasByUserName } from "../../components/Elements/ListaPreguntasByUserName/ListaPreguntasByUserName";

interface Props {
  name: string;
}

const UserNickName = ({ name }: Props) => {
  const status = useCheckAuth();
  return (
    <>
      <Head>
        <title>Perfil de {name} en Atención al lector</title>
        <meta name="description" content="Atención al lector" />
      </Head>
      <Header />
      <main className={styles.nameContainer}>
        <div className={styles.nameContainer__left}></div>
        <div className={styles.nameContainer__main}>
          <ListaPreguntasByUserName name={name} />
        </div>
        <div className={styles.nameContainer__right}>
          <ListaSavedPreguntas status={status} />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { name } = params as { name: string };
  return {
    props: {
      name,
    },
  };
};

export default UserNickName;
