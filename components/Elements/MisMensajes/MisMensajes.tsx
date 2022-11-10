import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { loadUserMessages } from '../../../store/userMessages/thunks'
import { TbMessage2 , TbWriting } from 'react-icons/tb'
import styles from './MisMensajes.module.scss'

const MisMensajes = () => {
    const { user: { mensajes } } = useAppSelector( (state) => state.userMessages );
    const { uid } = useAppSelector( (state) => state.auth );
    const dispatch = useAppDispatch()
    useEffect(() => {
      uid && dispatch(loadUserMessages())      
    }, [uid])
    
  return (
    <>
      <div className={styles.mensajes}>
        { mensajes.length > 0 ? mensajes.map( msg => {
            return (
            <>
            <div className={styles.mensajes_up}>
                <TbWriting/>
                <span>{msg.autor}:</span>
            </div>
              <div className={styles.mensajes_card}>
                <div className={styles.mensajes_card__left}>
                  <TbMessage2/>
                </div>
                <div className={styles.mensajes_card__right}>
                  <p>{msg.texto}</p>
                </div>
              </div>
            </>
            )
          }) 
          : <span>No tenes mensajes</span>}    
      </div>
    </>
  )
}

export default MisMensajes