import React, { useState } from 'react'
import styles from "./Modal.module.scss";
import { RiCloseLine } from "react-icons/ri";
import { sendUserMessage } from '../../../store/userMessages/thunks';
import { useAppDispatch, useAppSelector } from "../../../hooks";

const Modal = ({ setIsOpen, uid, messageTo, setShowToast }:any) => {
    const dispatch = useAppDispatch()
    const { displayName } = useAppSelector( state => state.auth )
    const [ userMessage, setUserMessage ] = useState("")
    const messageFrom = displayName

    const sendMessage = () => {
        dispatch(sendUserMessage(uid, userMessage, messageFrom))
        setIsOpen(false)
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 3500);
    }

  return (
    <>
        <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
        <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Mensaje para {messageTo}</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <textarea
              maxLength={200}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              rows={10}
              placeholder="Escribí tu mensaje"
            />
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.enviarBtn} onClick={sendMessage}>
                Enviar
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal