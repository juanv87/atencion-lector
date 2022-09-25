import React from 'react'
import { useAppDispatch } from '../hooks';
import { startRemovingSavedPregunta } from '../store/entries';
import { IPregunta } from '../types/IPregunta';

interface Props {
  pregunta: IPregunta;
  setSavedPregunta: Function;
  setUpdatedSaved: Function;
  updatedSaved?: Boolean;
}

const useDelete = ({pregunta, setSavedPregunta, setUpdatedSaved, updatedSaved}: Props) => {
    
    const dispatch = useAppDispatch()
    const onDeleteSavedPregunta = async () => {
        await dispatch(startRemovingSavedPregunta({ pregunta }));
        setSavedPregunta(false);
        dispatch(setUpdatedSaved(!updatedSaved));
      };
  return {
    onDeleteSavedPregunta
  }
}

export default useDelete