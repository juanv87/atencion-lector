import React from 'react'
import { useAppDispatch } from '../hooks';
import { startRemovingSavedPregunta } from '../store/entries';
import { IPregunta } from '../types/IPregunta';

interface Props {
  pregunta: IPregunta;
  setSavedPregunta: Function;
  setUpdatedSaved: Function;
  updatedSaved?: Boolean;
  savedPregunta: Boolean
}

const useDelete = ({pregunta, setSavedPregunta, setUpdatedSaved, updatedSaved, savedPregunta }: Props) => {
    
    const dispatch = useAppDispatch()
    const onDeleteSavedPregunta = async () => {
        await dispatch(startRemovingSavedPregunta({ pregunta }));
        setSavedPregunta(!savedPregunta);
        dispatch(setUpdatedSaved(!updatedSaved));
      };
  return {
    onDeleteSavedPregunta
  }
}

export default useDelete