import React, { MutableRefObject, useRef } from 'react'
import { IconClose } from '../../Icons/IconClose';
import styles from './PreguntasSearch.module.scss'

const PreguntasSearch = ({ setQuery }:any) => {

    const search = useRef() as MutableRefObject<HTMLInputElement>;

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
		<input  
			type="text"
			onChange={(e) => handleQuerySearch(e)}
			id="search"
			placeholder="Buscá en la lista"
			className="search"
			ref={search}
		/>
		<button
			className="borrar"
			onClick={handleBorrar}
		>
			<IconClose color="black" size="1.5em" />
		</button>
	</div>
  )
}

export default PreguntasSearch