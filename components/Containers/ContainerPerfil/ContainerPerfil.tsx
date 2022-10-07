import Head from "next/head";
import { Header } from "../../ui/Header/Header";
import { MenuPerfil } from "../../ui/Perfil/Menu/MenuPerfil";

import styles from "../../../pages/perfil/Perfil.module.scss";
import { useCheckAuth } from "../../../hooks/useCheckAuth";
import { useRedirectNonUsers } from "../../../hooks/useRedirectNonUsers";
import { Portada } from "../../ui/Perfil/Portada/Portada";

interface Props {
  children: React.ReactNode;
}

const ContainerPerfil = ({ children }: Props) => {
  useCheckAuth();
  useRedirectNonUsers();
  return (
    <>
      <Head>
        <title>Perfil de en Atención al lector</title>
        <meta name="description" content="Atención al lector" />
      </Head>
      <Header />
      <Portada />
      <main className={styles.container_dashboard}>
        <aside>
          <MenuPerfil />
        </aside>
        <section className={styles.dashboard}>{children}</section>
      </main>
    </>
  );
};

export default ContainerPerfil;
