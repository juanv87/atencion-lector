import React from "react";
import { useAppDispatch } from "../hooks";
import { startSavingPregunta } from "../store/entries";
import { IPregunta } from "../types/IPregunta";
import { MouseEvent } from "react";
import { setUpdatedSaved } from "../store/savedByUser/savedByUserSlice";

interface Props {
  pregunta: IPregunta;
  setSavingPregunta: Function;
  setSavedPregunta: Function;
  updatedSaved: boolean;
}

const useSave = ({
  pregunta,
  setSavingPregunta,
  updatedSaved,
  setSavedPregunta,
}: Props) => {
  const dispatch = useAppDispatch();
  const onSavePregunta = async (e: MouseEvent) => {
    e.preventDefault();
    setSavingPregunta(true);
    await dispatch(startSavingPregunta({ pregunta }));
    setSavingPregunta(false);
    setSavedPregunta(true);
    dispatch(setUpdatedSaved(!updatedSaved));
  };
  return {
    onSavePregunta,
  };
};

export default useSave;
