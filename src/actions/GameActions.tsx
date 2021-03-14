import { FETCH_GAME } from "../constants/ActionTypes";
import { SingleGameResponse } from "../types/GameType";
import { AppThunk } from "../types/ThunkType";
import { fetchApi } from "../utils/api";

const storeGame = (slug: string, game: SingleGameResponse) => ({
  type: FETCH_GAME,
  payload: { slug, game },
});

const fetchGame = (slug: string): AppThunk => {
  return async (dispatch) => {
    const game = (await fetchApi(`/games/${slug}`)).data as SingleGameResponse;
    dispatch(storeGame(slug, game));
  };
};

export const fetchGameIfNeeded = (slug: string): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.game[slug]) {
      dispatch(fetchGame(slug));
    }
  };
};
