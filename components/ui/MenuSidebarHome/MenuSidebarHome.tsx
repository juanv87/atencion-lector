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
        <UserAvatar showName={false} showLogOut={false} />
      </div>
      <ul>
        <li>
          <Link href="/">
            <a>
              <IconLike size={18} />
              <span>Preguntas mas likeadas</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <IconBtnSaved />
              <span>Preguntas guardadas</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <IconPregunta size="1.2em" />
              <span>Tus preguntas</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <TbMessage2 />
              <span>Mensajes</span>
            </a>
          </Link>
        </li>
      </ul>
    </section>
  );
};
