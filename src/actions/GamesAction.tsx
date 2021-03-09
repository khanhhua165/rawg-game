import {
  FETCH_GAMES,
  FETCH_GAMES_GENRE_SUCCESS,
  FETCH_GAMES_SEARCH_SUCCESS,
} from "../constants/ActionTypes";
import { GameType } from "../types/GameType";
import { GameResponse, InvalidResponse } from "../types/ResponseType";
import { AppThunk } from "../types/ThunkType";
import { fetchApi } from "../utils/api";

const startFetchGames = () => ({
  type: FETCH_GAMES,
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

type FetchType = "genre" | "search";

const fetchGames = (
  type: FetchType,
  key: string,
  page: number = 1
): AppThunk => {
  return async (dispatch) => {
    dispatch(startFetchGames);
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
    if (type === "search") {
      const params = { search: key, page };
      const gamesData = (await fetchApi("/games", params)).data;
      if (!(gamesData as InvalidResponse).detail) {
        const nextPage = page + 1;
        dispatch(
          storeGamesSearch(key, nextPage, (gamesData as GameResponse).results)
        );
      }
    }
  };
};

export const getUnfetchedGamesGenre = (genre: string): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.games.gamesByGenre[genre]) {
      dispatch(fetchGames("genre", genre));
    }
  };
};

export const getUnfetchedGamesSearch = (searchString: string): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.games.gamesBySearch[searchString]) {
      dispatch(fetchGames("search", searchString));
    }
  };
};
