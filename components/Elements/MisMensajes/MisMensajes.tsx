import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { loadUserMessages } from '../../../store/userMessages/thunks'

const MisMensajes = () => {
    const { user: { mensajes } } = useAppSelector( (state) => state.userMessages );
    const { uid } = useAppSelector( (state) => state.auth );
    const dispatch = useAppDispatch()
    useEffect(() => {
      uid && dispatch(loadUserMessages())      
    }, [uid])
    
  return (
    <>
      <div className='mensajes'>
        { mensajes.length > 0 ? mensajes.map( msg => {
            return (
            <>
              <div className="mensajes_card">
                <span>De: {msg.autor}</span>
                <p>Mensaje: {msg.texto}</p>
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