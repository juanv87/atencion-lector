import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./MenuPerfil.module.scss";

export const MenuPerfil = () => {
  const router = useRouter();
  return (
    <nav className={styles.nav}>
      <ul>
        <li
          className={router.pathname == "/perfil/mis-preguntas" ? "active" : ""}
        >
          <Link href="/perfil/mis-preguntas">
            <a>Mis preguntas</a>
          </Link>
        </li>
        <li
          className={
            router.pathname == "/perfil/mis-respuestas" ? "active" : ""
          }
        >
          <Link href="/perfil/mis-respuestas">
            <a>Mis respuestas</a>
          </Link>
        </li>
        <li className={router.pathname == "/" ? "active" : ""}>
          <a href="#">Mis favoritos</a>
        </li>
      </ul>
    </nav>
  );
};
