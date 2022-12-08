import Link from "next/link";
import React from "react";
import { IconBtnSave } from "../../Icons/IconBtnSave";
import { IconBtnSaved } from "../../Icons/IconBtnSaved";
import { UserAvatar } from "../../User/UserAvatar/UserAvatar";
import styles from "./MenuSidebarHome.module.scss";
import IconLike from "../../Icons/IconLike";
import { IconPregunta } from "../../Icons/IconPregunta";
import { TbMessage2 } from "react-icons/tb";

export const MenuSidebarHome = () => {
  return (
    <section className={styles.container}>
      <div className={styles.userAvatar}>
        <UserAvatar showName={true} showLogOut={false} />
      </div>
      <ul>
        <li>
          <Link href="/perfil/mis-preguntas">
            <a>
              <IconPregunta size="1.4em" />
              <span>Tus preguntas</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/perfil/preguntas-guardadas">
            <a>
              <IconBtnSaved size="1.3em" />
              <span>Preguntas guardadas</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/perfil/mis-mensajes">
            <a>
              <TbMessage2 size={25} />
              <span>Mensajes</span>
            </a>
          </Link>
        </li>
      </ul>
    </section>
  );
};
