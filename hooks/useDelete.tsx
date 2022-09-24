import React from 'react'
import { useAppDispatch } from '../hooks';
import { startRemovingSavedPregunta } from '../store/entries';


const useDelete = () => {
    
    const dispatch = useAppDispatch()
    const onDeleteSavedPregunta = async (pregunta:any, setSavedPregunta:any, setUpdatedSaved:any, updatedSaved:any) => {
        await dispatch(startRemovingSavedPregunta({ pregunta }));
        setSavedPregunta(false);
        dispatch(setUpdatedSaved(!updatedSaved));
      };
  return {
    onDeleteSavedPregunta
  }
}

export default useDelete