import React from 'react'
import { useAppSelector } from "../../../hooks";
import styles from './MostLiked.module.scss'
import LoadingSpinner from '../../Loaders/LoadingSpinner/LoadingSpinner';
import { IPregunta } from "../../../types/IPregunta";
import { SideCard } from '../SideCard/SideCard';

const MostLiked = () => {
    
    const { preguntas, isLoadingPreguntas } = useAppSelector((state) => state.entries);

    const sorted = [...preguntas]
    
    const mostLiked = sorted.sort((a,b) => {
        let x = a.likes,
            y = b.likes;
        return x < y ? 1 : x > y ? -1 : 0
    })
    
  return (
    <>
      <section className={styles.mostLiked}>
        <div className={styles.mostLikedTitle}>
            <h2>Top 5 de preguntas</h2>
        </div>
        <div className={styles.mostLikedContainer}>
            {isLoadingPreguntas && <LoadingSpinner />}
            {
            mostLiked.length > 0 ?
            mostLiked.slice(0,5).map((pregunta: IPregunta) => (
                <SideCard key={pregunta.id} pregunta={pregunta} mostLiked={true} saved={false}/>
            )) : <span>No se encontraron resultados para tu búsqueda</span>
            }
        </div>

      </section>
    </>
  )
}

export default MostLiked