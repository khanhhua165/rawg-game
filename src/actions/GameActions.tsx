import { FETCH_GAME } from "../constants/ActionTypes";
import {
  Screenshot,
  ScreenshotResponse,
  SingleGameResponse,
} from "../types/GameType";
import { AppThunk } from "../types/ThunkType";
import { fetchApi } from "../utils/api";

const storeGame = (
  slug: string,
  game: SingleGameResponse & { screenshots: Screenshot[] }
) => ({
  type: FETCH_GAME,
  payload: { slug, game },
});

const fetchGame = (slug: string): AppThunk => {
  return async (dispatch) => {
    const [gameRes, screenshotRes] = await Promise.all([
      fetchApi(`/games/${slug}`),
      fetchApi(`/games/${slug}/screenshots`),
    ]);
    const game = gameRes.data as SingleGameResponse;
    const screenshots = (screenshotRes.data as ScreenshotResponse).results;

    dispatch(storeGame(slug, { ...game, screenshots }));
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
