import React, { useRef } from 'react'
import styles from './PreguntasSearch.module.scss'

const PreguntasSearch = ({ setQuery }:any) => {

    const search = useRef<HTMLInputElement>(null);

    const handleQuerySearch = (e:any) => {
		setQuery(e.target.value)
	};

    const handleBorrar = (e:any) => {
		e.preventDefault();
        setQuery('')
        search.current.value = "";
	};

  return (
    <div className={styles.preguntasSearch}>
        <span>Buscá en la lista</span>
		<input  
			type="search"
			onChange={(e) => handleQuerySearch(e)}
			id="search"
			className="search"
            ref={search}
			/>
		<button
			className="borrar"
			onClick={handleBorrar}
		>
			X
		</button>
	</div>
  )
}

export default PreguntasSearch