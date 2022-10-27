import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../../hooks";
import { Colors } from "../../../../styles/Colors";
import { IconBtnSaved } from "../../../Icons/IconBtnSaved";
import { IconDefaultAvatar } from "../../../Icons/IconDefaultAvatar";
import { IconPregunta } from "../../../Icons/IconPregunta";
import { IconValidar } from "../../../Icons/IconValidar";
import styles from "./MenuMobilePerfil.module.scss";
export const MenuMobilePerfil = () => {
  const router = useRouter();
  const { admin } = useAppSelector((state) => state.auth);
  const { blue } = Colors;
  return (
    <nav className={styles.navPerfil}>
      <ul>
        <li>
          <Link href="/perfil">
            <a>
              <IconDefaultAvatar
                color={router.pathname == "/perfil" ? blue : "#000"}
              />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/perfil/mis-preguntas">
            <a>
              <IconPregunta
                color={
                  router.pathname == "/perfil/mis-preguntas" ? blue : "#000"
                }
              />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/perfil/preguntas-guardadas">
            <a>
              <IconBtnSaved
                color={
                  router.pathname == "/perfil/preguntas-guardadas"
                    ? blue
                    : "#000"
                }
                size="20"
              />
            </a>
          </Link>
        </li>
        {admin && (
          <li>
            <Link href="/perfil/preguntas-a-validar">
              <a>
                <IconValidar
                  color={
                    router.pathname == "/perfil/preguntas-a-validar"
                      ? blue
                      : "#000"
                  }
                />
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
