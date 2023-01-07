import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingTweetsByUserName } from "../../../store/tweets";
import { IPregunta } from "../../../types/IPregunta";
import { ITweet } from "../../../types/ITweet";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";
import { TweetCard } from "../TweetCard/TweetCard";

export const ListaTweetsByUserProfile = ({nickName}: {nickName: string}) => {
  const { isLoading, error, data } = useQuery("tweetsByName", () =>
    fetch(`${process.env.NEXT_PUBLIC_URL_PROD}/api/tweets/${nickName}`).then((res) =>
      res.json()
    )
  );
  return (
    <>
      {
        isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div>Algo anduvo mal.</div>
        ) : null
      }
      {data?.tweets?.map((tweet: ITweet) => {
        return <TweetCard key={tweet.id} tweet={tweet} />;
      })}
    </>
  );
};
