import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingTweets } from "../../../store/tweets";
import { IPregunta } from "../../../types/IPregunta";
import { ITweet } from "../../../types/ITweet";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";
import { TweetCard } from "../TweetCard/TweetCard";
import styles from "./ListaAllTweets.module.scss";
import { useQuery } from "react-query";

export const ListaAllTweets = ({ limit }: { limit: number }) => {
  const { isLoading, error, data } = useQuery("listTweets", () =>
    fetch(`${process.env.NEXT_PUBLIC_URL_PROD}/api/tweets?limit=${limit}`).then(
      (res) => res.json()
    )
  );

  return (
    <section className={styles.listaTweets}>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>Something went wrong</div>
      ) : null}
      {data?.tweets.map((tweet: ITweet) => {
        return <TweetCard key={tweet.id} tweet={tweet} />;
      })}
    </section>
  );
};
