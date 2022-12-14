import Link from "next/link";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { startLoadingPreguntasByUserName } from "../../../../store/entries";
import styles from "./Portada.module.scss";

export const Portada = () => {
  const { uid, displayName, nickName, photoURL } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    uid && dispatch(startLoadingPreguntasByUserName({ name: nickName }));
  }, [uid]);
  return (
    <section className={styles.portada}>
      <div className={styles.container_portada}>
        <div className={styles.avatar}>
          <Link href="/perfil">
            <a>
              <img
                height="80"
                width="80"
                src={photoURL || "/img/avatar.jpg"}
                alt={displayName !== null ? displayName : ""}
              />
              <span>{nickName}</span>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};
