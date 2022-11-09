import { createSlice } from "@reduxjs/toolkit";

export const userMessages = createSlice({
  name: "userMessages",
  initialState: {
    user: {
        id:"",
        mensajes: [
          {
            autor: '',
            texto: ''
          }
        ]
    }
  },
  reducers: {
    // Funciones que modifican el state global de la aplicacion.
    
    setUserMessages: (state, action) => {
        state.user.mensajes = action.payload;
    },   
    
    setUserLoggedId: (state, action) => {
        state.user.id = action.payload;
        // state.isLoadingPreguntas = false;
      },   
    
    
  },
});
export const {  
    setUserMessages,
    setUserLoggedId
} = userMessages.actions;