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
        state.user.likedPreguntas = [...state.user.likedPreguntas, action.payload];
    },   
    removeFromLiked: (state, action) => {
        let filterLiked = state.user.likedPreguntas.filter( liked => liked !== action.payload)
        state.user.likedPreguntas = filterLiked;
    },   
    setUserLoggedId: (state, action) => {
        state.user.id = action.payload;
        // state.isLoadingPreguntas = false;
      },   
    
    
  },
});
export const {  
    addToLiked,  
    removeFromLiked,
    setUserLoggedId
} = likedByUser.actions;