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
  getDoc,
} from "firebase/firestore/lite";
import { loadTweets } from "../../helpers/loadTweets";
import { loadTweetsByUserName } from "../../helpers/loadTweetsByUserName";
import { FirebaseDB } from "../../lib/firebase/firebase";
import {
  addNewEmptyTweet,
  loadingTweets,
  savingNewTweet,
  setTweets,
  setTweetsByUserName,
  updateTweet,
  updatingNewTweet,
  setUpdateBody,
} from "./tweetsSlice";

export const startNewTweet = ({ bodyTweet }) => {
  const bodyTweetSlug =
    bodyTweet.toLowerCase().replace(/ /g, "-") + "-" + Date.now();
  return async (dispatch, getState) => {
    dispatch(savingNewTweet());
    const { uid, displayName, email, photoURL } = getState().auth;
    const newDoc = doc(collection(FirebaseDB, `tweets`));
    const newTweet = {
      id: newDoc.id,
      body: bodyTweet,
      validada: false,
      autor: {
        id: uid,
        displayName,
        userName: email?.split("@")[0] || "",
        email,
        photoURL,
      },
      createdAt: new Date().getTime(),
    };
    await setDoc(newDoc, newTweet);

    dispatch(addNewEmptyTweet(newTweet));
  };
};

export const startLoadingTweets = (id) => {
  return async (dispatch, getState) => {
    dispatch(loadingTweets());
    const tweets = await loadTweets();
    dispatch(setTweets(tweets));
  };
};

export const startLoadingTweetsByUserName = ({ name }) => {
  return async (dispatch, getState) => {
    dispatch(loadingTweets());
    dispatch(startLoadingTweets({ name }));
    const tweets = await loadTweetsByUserName({ name });
    dispatch(setTweetsByUserName(tweets));
  };
};

export const startSavingTweet = ({ tweet }) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newDoc = doc(collection(FirebaseDB, "usuarios"), uid);
    await updateDoc(newDoc, { tweetsGuardadas: arrayUnion(tweet) });
  };
};

export const startRemovingSavedTweet = ({ tweet }) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const docRef = doc(collection(FirebaseDB, "usuarios"), uid);
    await updateDoc(docRef, { tweetsGuardadas: arrayRemove(tweet) });
  };
};

export const updateBody = (id, updatedBody) => {
  return async (dispatch, getState) => {
    dispatch(setUpdateBody({ id, updatedBody }));
    const docRef = doc(collection(FirebaseDB, "tweets"), id);
    await updateDoc(docRef, { body: updatedBody });
  };
};
