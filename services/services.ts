import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
  } from "firebase/firestore/lite";
  import { FirebaseDB } from "../lib/firebase/firebase";
  
  interface Props {
    uid: string;
    mensaje: string;
  }
  
  export const loadMessages = async ({ uid }: Props) => {
    const collectionRef = doc(FirebaseDB, "usuarios", uid);
    const docs = await getDoc(collectionRef);
    const userInfo = docs.data();
    const messages = userInfo?.mensajes;
    return messages;
  };
  
  export const sendMessages = async (uid:string, mensaje:string, messageFrom:string) => {
    let message = { autor: messageFrom, texto: mensaje }
    const collectionRef = doc(FirebaseDB, "usuarios", uid);   
    await updateDoc(collectionRef, { mensajes: arrayUnion(message) });
  };