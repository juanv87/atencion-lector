import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { PreguntaCard } from "../../components/Elements/PreguntaCard/PreguntaCard";
import { Header } from "../../components/ui/Header/Header";
import { AddPregunta } from "../../components/User/AddPregunta/AddPregunta";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useRedirectNonUsers } from "../../hooks/useRedirectNonUsers";
import { FirebaseAuth } from "../../lib/firebase/firebase";
import { startLoadingPreguntasByUserName } from "../../store/entries";
import { IPregunta } from "../../types/IPregunta";

const Perfil = () => {
  useCheckAuth();
  const dispatch = useAppDispatch();
  const { uid, displayName, nickName } = useAppSelector((state) => state.auth);

  useRedirectNonUsers();

  useEffect(() => {
    uid && dispatch(startLoadingPreguntasByUserName({ name: nickName }));
  }, [uid]);

  const { preguntasByUserName } = useAppSelector((state) => state.entries);

  return (
    <>
      <Head>
        <title>Perfil de {displayName} en Atención al lector</title>
        <meta name="description" content="Atención al lector" />
      </Head>
      <Header />
      <main>
        <h1>Perfil de {displayName}</h1>
        <AddPregunta />
        {preguntasByUserName &&
          preguntasByUserName.map((pregunta: IPregunta) => {
            return <PreguntaCard key={pregunta.id} pregunta={pregunta} />;
          })}
      </main>
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
