import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { saveAboutMe } from '../../../services/services';
import { setAboutMe } from '../../../store/auth';
import IconEdit from '../../Icons/IconEdit';
import { ButtonPrimary } from '../../StyledComponents/ButtonPrimary.styled';
import styles from './AboutMe.module.scss'

const AboutMe = () => {
  const dispatch = useAppDispatch();
  const { uid , aboutMe} = useAppSelector((state) => state.auth);      
  const [bodyAboutMe, setBodyAboutMe] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(()=>{
    setBodyAboutMe(aboutMe ? aboutMe : '')
  }, [aboutMe])  

  const onClickAboutMe = (e:React.MouseEvent) => {
    e.preventDefault();
    saveAboutMe(uid, bodyAboutMe)
    setEdit(false)
    dispatch(setAboutMe(bodyAboutMe))
  }
  
  const onClickEditAboutMe = (e:React.MouseEvent) => {
    e.preventDefault();
    setEdit(true)
  }

  return (
    <div className={styles.aboutMe}>
        <h1>Sobre mí</h1>
        {   (aboutMe === '' || undefined) || edit ?
            <> 
            <div className={styles.textAreaContainer}>
            <textarea
                    maxLength={1000}
                    value={bodyAboutMe}
                    onChange={(e) => setBodyAboutMe(e.target.value)}
                    rows={10}
                    placeholder="Contanos sobre vos..."
                />
            <p>{bodyAboutMe.length} / 1000</p>
        </div>
        <div className={styles.editButtons}>
            <ButtonPrimary
                onClick={(e:React.MouseEvent) =>
                    onClickAboutMe(e)
                }
                // disabled={isSaving}
            >
                {/* {isSaving ? "Enviando..." : "Enviar"} */}
                Aceptar
            </ButtonPrimary>
            { edit && 
            <ButtonPrimary
            onClick={() => { 
                setEdit(false)
                setBodyAboutMe(aboutMe)
                }  
            }            
        >            
            Cancelar edición
        </ButtonPrimary>}
        </div>
        </> : <>
              <div className={styles.aboutMeContainer}>
                <p>``{aboutMe}´´</p>
              </div>
              <div 
                className={styles.editButton}
                onClick={(e: React.MouseEvent) =>
                    onClickEditAboutMe(e)
                }  >
                <IconEdit />                   
              </div>
              </>
          }
    </div>
  )
}

export default AboutMe