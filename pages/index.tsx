import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ListaAllTweets } from "../components/Elements/ListaAllTweets/ListaAllTweets";
import { ListaPreguntas } from "../components/Elements/ListaPreguntas/ListaPreguntas";
import { ListaSavedPreguntas } from "../components/Elements/ListaSavedPreguntas/ListaSavedPreguntas";
import MostLiked from "../components/Elements/MostLiked/MostLiked";
import PreguntasSearch from "../components/Elements/preguntasSearch/PreguntasSearch";
import UsersList from "../components/Elements/UsersList/UsersList";
import { Header } from "../components/ui/Header/Header";
import { MenuSidebarHome } from "../components/ui/MenuSidebarHome/MenuSidebarHome";
import { MobileNav } from "../components/ui/MobileNav/MobileNav";
import Modal from "../components/ui/Modal/Modal";
import { AddPregunta } from "../components/User/AddPregunta/AddPregunta";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { startLoadingPreguntas } from "../store/entries";
import styles from "./Home.module.scss";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(startLoadingPreguntas());
  }, []);

  useCheckAuth();
  return (
    <>
      <Head>
        <title>Prototipo 1 - Centro de atención al lector</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className={styles.homeContainer}>
          <div className={styles.homeContainer__left}>
            <div className={styles.listAllTweets}>
              <ListaAllTweets limit={10} />
            </div>
            <MostLiked />
          </div>
          <div className={styles.homeContainer__main}>
            <div className={styles.addPregunta}>
              <AddPregunta />
            </div>
            <PreguntasSearch setQuery={setQuery} />
            <ListaPreguntas query={query} />
          </div>
          <div className={styles.homeContainer__right}>
            <UsersList />
          </div>
        </div>
        <div>{isOpen && <Modal setIsOpen={setIsOpen} />}</div>
      </main>
    </>
  );
};

export default Home;
