import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingTweets } from "../../../store/tweets";
import { IPregunta } from "../../../types/IPregunta";
import { ITweet } from "../../../types/ITweet";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";
import { TweetCard } from "../TweetCard/TweetCard";

export const ListaAllTweets = () => {
  const { uid, nickName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      uid && dispatch(startLoadingTweets());
      console.log("intervalo")
    }, 10000);
    return () => clearInterval(interval);
  }, [uid]);
  
  const { tweets } = useAppSelector((state) => state.tweets);
  const sorted = [...tweets];

  const tweetsSorted = sorted.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });
  return (
    <>
      {tweetsSorted.map((tweet: ITweet) => {
        return <TweetCard key={tweet.id} tweet={tweet} />;
      })}
    </>
  );
};
