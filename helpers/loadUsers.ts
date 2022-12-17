import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../lib/firebase/firebase";

export const loadUsers = async () => {
  const collectionRef = collection(FirebaseDB, "usuarios");
  const docs = await getDocs(collectionRef);
  let usersList = [] as Array<{}>;
  docs.forEach((doc) => {
    usersList = [...usersList, { 
      id: doc.id, 
      nickName: doc.data().nickName, 
      photoURL: doc.data().photoURL      
    }];
  });
  
  return usersList
};
