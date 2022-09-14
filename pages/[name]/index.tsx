import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { Header } from "../../components/ui/Header/Header";
import Head from "next/head";

import styles from "./Name.module.scss";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { startLoadingPreguntasByUserName } from "../../store/entries";
import { Pregunta } from "../../components/Elements/Pregunta/Pregunta";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { ListaSavedPreguntas } from "../../components/Elements/ListaSavedPreguntas/ListaSavedPreguntas";
import { IPregunta } from "../../types/IPregunta";

interface Props {
  name: string;
}

const UserNickName = ({ name }: Props) => {
  const dispatch = useAppDispatch();
  const status = useCheckAuth();
  useCheckAuth();
  console.log("🚀 ~ file: index.tsx ~ line 22 ~ UserNickName ~ status", status);
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
        <div className={styles.nameContainer__left}></div>
        <div className={styles.nameContainer__main}>
          {preguntasByUserName &&
            preguntasByUserName.map((pregunta: IPregunta) => {
              return <Pregunta key={pregunta.id} pregunta={pregunta} />;
            })}
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
