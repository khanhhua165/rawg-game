import {
  FETCH_GAMES,
  FETCH_GAMES_SUCCESS,
  REVERSE_FETCH_GAMES,
} from "../constants/ActionTypes";
import { GameType } from "../types/GameType";
import { GameResponse, InvalidResponse } from "../types/ResponseType";
import { AppThunk } from "../types/ThunkType";
import { fetchApi } from "../utils/api";

export const startFetchGames = () => ({
  type: FETCH_GAMES,
});

export const stopFetchGames = () => ({
  type: REVERSE_FETCH_GAMES,
});

const storeGamesGenre = (
  genre: string,
  nextPage: number | null,
  gamesLoaded: GameType[]
) => {
  return {
    type: FETCH_GAMES_GENRE_SUCCESS,
    payload: {
      genre,
      nextPage,
      gamesLoaded,
    },
  };
};

const storeGamesSearch = (
  searchString: string,
  nextPage: number | null,
  gamesLoaded: GameType[]
) => {
  return {
    type: FETCH_GAMES_SEARCH_SUCCESS,
    payload: {
      searchString,
      nextPage,
      gamesLoaded,
    },
  };
};

const fetchGames = (
  queryType: string,
  queryString: string,
  page: number = 1
): AppThunk => {
  return async (dispatch) => {
    dispatch(startFetchGames());
    if (type === "genre") {
      const params = { genres: key, page };
      const gamesData = (await fetchApi("/games", params)).data;
      if (!(gamesData as InvalidResponse).detail) {
        const nextPage = page + 1;
        dispatch(
          storeGamesGenre(key, nextPage, (gamesData as GameResponse).results)
        );
      }
    }
  };
};

export const getUnfetchedGames = (
  queryType: string,
  queryString: string
): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.games[queryType][queryString]) {
      dispatch(fetchGames(queryType, queryString));
    } else {
      dispatch(stopFetchGames());
    }
  };
};
