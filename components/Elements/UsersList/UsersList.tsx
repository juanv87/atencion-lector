import Link from 'next/link'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { startLoadingUsers } from '../../../store/users';
import styles from './UsersList.module.scss'

const UsersList = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  useEffect(() => {
    dispatch(startLoadingUsers())
  }, [])
  return (
    <div className={styles.usersList}>
      <h3>Usuarios del sitio</h3>
      <div className={styles.usersContainer}>
        { users?.map( ({nickName, id, photoURL}) => 
          <Link key={id} href={`/${nickName}`}>
            <a>
              <img
                width="30"
                src={photoURL || "/img/avatar.jpg"}
                alt={nickName !== null ? nickName : ""}
                />
              <span>{nickName}</span>
            </a>
          </Link>
        )}    
      </div>
    </div>
  )
}

export default UsersList