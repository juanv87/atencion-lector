import Link from 'next/link'
import React from 'react'
import styles from './UsersList.module.scss'

const UsersList = ( { usersList }:any ) => {

    console.log(usersList)
  return (
    <>
    <div className={styles.usersList}>
        <h3>Usuarios del sitio</h3>
        { usersList && usersList.map( (user:any, index:any) => {
        return (
            <>
              <Link href={`/${user}`}>
                  <span key={index}>
                      {
                          user
                      }
                  </span>
              </Link>
            </>
        )
        })}    
    </div>
    </>
  )
}

export default UsersList