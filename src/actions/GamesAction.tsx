import { FETCH_GAMES, FETCH_GENRES_SUCCESS } from "../constants/ActionTypes";
import { GameType } from "../types/GameType";
import { GameResponse, InvalidResponse } from "../types/ResponseType";
import { AppThunk } from "../types/ThunkType";
import { fetchApi } from "../utils/api";

const startFetchGames = () => ({
  type: FETCH_GAMES,
});

const storeGames = (
  genre: string,
  nextPage: number | null,
  gamesLoaded: GameType[]
) => {
  return {
    type: FETCH_GENRES_SUCCESS,
    payload: {
      genre,
      nextPage,
      gamesLoaded,
    },
  };
};

export const fetchGames = (genre: string, page: number = 1): AppThunk => {
  return async (dispatch) => {
    dispatch(startFetchGames);
    if (genre) {
      const params = { genre, page };
      const gamesData = (await fetchApi("/games", params)).data;
      if (!(gamesData as InvalidResponse).detail) {
        const nextPage = page + 1;
        dispatch(
          storeGames(genre, nextPage, (gamesData as GameResponse).results)
        );
      }
    }
  };
};

export const getUnfetchedGenres = (genre: string): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.gamesByGenre.games[genre]) {
      dispatch(fetchGames(genre));
    }
  };
};
