import { loadFeed } from "../../helpers/loadFeed";
import { setFeed, loadingFeed } from "./feedSlice";

export const startLoadingFeed = () => {
  return async (dispatch, getState) => {
    dispatch(loadingFeed());
    const entradas = await loadFeed();
    console.log("startLoadingFeed", entradas);
    dispatch(setFeed(entradas));
  };
};
