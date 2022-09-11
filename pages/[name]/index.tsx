import { FC, useEffect } from "react";
import { GetServerSideProps } from "next";
import { AppProps } from "next/app";
import { Header } from "../../components/ui/Header/Header";
import Head from "next/head";

import styles from "./Name.module.scss";

import { collection, query, where, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../../lib/firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  startLoadingPreguntas,
  startLoadingPreguntasByUserName,
} from "../../store/entries";
import { loadPreguntasByUserName } from "../../helpers/loadPreguntasByUserName";
import { Pregunta } from "../../components/Elements/Pregunta/Pregunta";
import { useCheckAuth } from "../../hooks/useCheckAuth";

const UserNickName: FC<AppProps> = ({ name }: any) => {
  const dispatch = useAppDispatch();
  useCheckAuth();
  useEffect(() => {
    dispatch(startLoadingPreguntasByUserName({ name }));
  }, []);

  const { preguntasByUserName } = useAppSelector((state) => state.entries);
  return (
    <>
      <Head>
        <title>Perfil de {name} en Atención al lector</title>
        <meta name="description" content="Atención al lector" />
      </Head>
      <Header />
      <main className={styles.nameContainer}>
        {preguntasByUserName &&
          preguntasByUserName.map((pregunta: any) => {
            return <Pregunta key={pregunta.id} pregunta={pregunta} />;
          })}

        {/* {preguntasByUserName &&
          preguntasByUserName.map((pregunta) => {
            console.log(
              "🚀 ~ file: index.tsx ~ line 48 ~ preguntasByUserName.map ~ pregunta",
              pregunta
            );
            return pregunta.titulo;
          })} */}
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
