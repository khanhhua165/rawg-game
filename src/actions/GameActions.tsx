import { FETCH_GAME } from "../constants/ActionTypes";
import {
  Screenshot,
  ScreenshotResponse,
  SingleGameResponse,
} from "../types/GameType";
import { Trailer, TrailerResponse } from "../types/ResponseType";
import { AppThunk } from "../types/ThunkType";
import { fetchApi } from "../utils/api";

const storeGame = (
  slug: string,
  game:
    | (SingleGameResponse & { screenshots: Screenshot[] } & {
        trailers: Trailer[];
      })
    | { error: boolean }
) => ({
  type: FETCH_GAME,
  payload: { slug, game },
});

const fetchGame = (slug: string): AppThunk => {
  return async (dispatch) => {
    try {
      const [gameRes, screenshotRes, trailerRes] = await Promise.all([
        fetchApi(`/games/${slug}`),
        fetchApi(`/games/${slug}/screenshots`),
        fetchApi(`/games/${slug}/movies`),
      ]);
      const game = gameRes.data as SingleGameResponse;
      const screenshots = (screenshotRes.data as ScreenshotResponse).results;
      const trailers = (trailerRes.data as TrailerResponse).results;
      dispatch(storeGame(slug, { ...game, screenshots, trailers }));
    } catch (e: unknown) {
      dispatch(storeGame(slug, { error: true }));
    }
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
