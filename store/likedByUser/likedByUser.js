import { createSlice } from "@reduxjs/toolkit";

export const likedByUser = createSlice({
  name: "likedByUser",
  initialState: {
    user: {
        id:"",
        likedPreguntas: []
    }
  },
  reducers: {
    // Funciones que modifican el state global de la aplicacion.
    
    addToLiked: (state, action) => {
      // let alreadyLiked = state.user.likedPreguntas.filter( liked => liked.id === action.payload.id)

        state.user.likedPreguntas = [...state.user.likedPreguntas, action.payload];
      // state.isLoadingPreguntas = false;
    },   
    setUserLoggedId: (state, action) => {
        state.user.id = action.payload;
        // state.isLoadingPreguntas = false;
      },   
    
  },
});
export const {  
    addToLiked,  
    setUserLoggedId
} = likedByUser.actions;