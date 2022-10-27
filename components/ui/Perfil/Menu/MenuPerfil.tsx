import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../../hooks";
import styles from "./MenuPerfil.module.scss";

export const MenuPerfil = () => {
  const router = useRouter();
  const { admin } = useAppSelector((state) => state.auth);
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={router.pathname == "/perfil" ? styles.active : ""}>
          <Link href="/perfil">
            <a>Mis datos</a>
          </Link>
        </li>
        <li
          className={
            router.pathname == "/perfil/mis-preguntas" ? styles.active : ""
          }
        >
          <Link href="/perfil/mis-preguntas">
            <a>Mis preguntas</a>
          </Link>
        </li>
        <li
          className={
            router.pathname == "/perfil/preguntas-guardadas"
              ? styles.active
              : ""
          }
        >
          <Link href="/perfil/preguntas-guardadas">
            <a>Preguntas guardadas</a>
          </Link>
        </li>
        {admin && (
          <li
            className={
              router.pathname == "/perfil/preguntas-a-validar"
                ? styles.active
                : ""
            }
          >
            <Link href="/perfil/preguntas-a-validar">
              <a>Preguntas a validar</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
