import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    FieldValue,
    query,
    setDoc,
    updateDoc,
    where,
    increment,
    decrement,
    getDoc,
  } from "firebase/firestore/lite";
  
  import { FirebaseDB } from "../../lib/firebase/firebase";
  import {    
    likePregunta,
    disLikePregunta
  } from "../entries/entriesSlice";
  import { addToLiked, removeFromLiked } from "../likedByUser/likedByUser";

  export const updateLikes = (id, likedPreguntas, uid) => {    
    console.log("🚀 ~ file: thunks.js ~ line 24 ~ updateLikes ~ likedPreguntas", likedPreguntas)
    let alreadyLiked = likedPreguntas.filter( x => x === id).length > 0
    return async (dispatch, getState) => {
        if(!alreadyLiked){
            dispatch(likePregunta(id)) // Agrega los likes a la pregunta en Redux
            dispatch(addToLiked(id))   // Agrega las likeadas al usuario en Redux
            const preguntasFS = doc(collection(FirebaseDB, "preguntas"), id);
            await updateDoc(preguntasFS, { likes: increment(1) }); // Agrega los likes a la pregunta en FireStore
            const usuariosFS = doc(collection(FirebaseDB, "usuarios"), uid);
            await updateDoc(usuariosFS, { preguntasLikeadas: arrayUnion(id) }); // Agrega las likeadas al usuario en FireStore
        }else {
            dispatch(disLikePregunta(id)) // Remueve los likes de la pregunta en Redux
            dispatch(removeFromLiked(id)) // Remueve las likeadas al usuario en Redux
            const preguntasFS = doc(collection(FirebaseDB, "preguntas"), id);
            await updateDoc(preguntasFS, { likes: increment(-1) }); // Remueve los likes a la pregunta en FireStore
            const usuariosFS = doc(collection(FirebaseDB, "usuarios"), uid);
            await updateDoc(usuariosFS, { preguntasLikeadas: arrayRemove(id) }); // Remueve las likeadas al usuario en FireStore
        }
    };
  };

  export const getLikedByUser = (id) => {
    // Busca las likeadas del usuario desde FireStore
    return async (dispatch, getState) => {
      const newDoc = doc(collection(FirebaseDB, "usuarios"), id);
      const data = await getDoc(newDoc);
      const preguntasLikeadas = data.data().preguntasLikeadas;
      preguntasLikeadas?.map((liked) => {
        dispatch(addToLiked(liked));
      });
      return preguntasLikeadas;
    };
  };