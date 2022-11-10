import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { startLoadingTweetsByUserName } from "../../../store/tweets";
import { IPregunta } from "../../../types/IPregunta";
import { ITweet } from "../../../types/ITweet";
import { PreguntaCard } from "../PreguntaCard/PreguntaCard";
import { TweetCard } from "../TweetCard/TweetCard";

export const ListaTweetsByUserProfile = () => {
  const { uid, nickName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    uid && dispatch(startLoadingTweetsByUserName({ name: nickName }));
  }, [uid]);

  const { tweetsByUserName } = useAppSelector((state) => state.tweets);
  return (
    <>
      {tweetsByUserName.map((tweet: ITweet) => {
        return <TweetCard key={tweet.id} tweet={tweet} />;
      })}
    </>
  );
};
