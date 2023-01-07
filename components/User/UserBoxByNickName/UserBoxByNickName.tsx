import Link from "next/link"
import styles from "./UserBoxByNickName.module.scss"

const UserBoxByNickName = ({photoURL, nickName, size}: {photoURL: string, nickName: string, size: number}) => {
  return (
    <div className={styles.userBox}>
      <Link href="/perfil/">
          <a>
            <img
              width={size}
              src={photoURL || "/img/avatar.jpg"}
              alt={nickName !== null ? nickName : ""}
            />
            <span>{nickName}</span>
          </a>
        </Link>
    </div>
  )
}

export default UserBoxByNickName