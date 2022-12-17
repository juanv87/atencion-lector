import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingTweets } from "../../../store/tweets";
import { IPregunta } from "../../../types/IPregunta";
import { ITweet } from "../../../types/ITweet";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";
import { TweetCard } from "../TweetCard/TweetCard";
import styles from "./ListaAllTweets.module.scss";

export const ListaAllTweets = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(startLoadingTweets(5));
  }, []);
  
  const { tweets } = useAppSelector((state) => state.tweets);
  const sorted = [...tweets];

  const tweetsSorted = sorted.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });
  return (
    <section className={styles.listaTweets}>
      {tweets.length <= 1 ? <LoadingSpinner /> : tweetsSorted.map((tweet: ITweet) => {
        return <TweetCard key={tweet.id} tweet={tweet} />;
      })}
    </section>
  );
};
