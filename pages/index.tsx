import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { ListaPreguntas } from "../components/Elements/ListaPreguntas/ListaPreguntas";
import { Header } from "../components/ui/Header/Header";
import { AddPregunta } from "../components/User/AddPregunta/AddPregunta";
import { useAppDispatch } from "../hooks";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { startLoadingPreguntas } from "../store/entries";
import styles from "./Home.module.scss";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(startLoadingPreguntas());
  }, []);
  return (
    <div>
      <Head>
        <title>Prototipo 1 - Centro de atención al lector</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className={styles.homeContainer}>
          <div className={styles.homeContainer__left}></div>
          <div className={styles.homeContainer__main}>
            <AddPregunta />
            {/* <Feed /> */}
            <ListaPreguntas />
          </div>
          <div className={styles.homeContainer__right}></div>
        </div>
      </main>
    </div>
  );
};

export default Home;
