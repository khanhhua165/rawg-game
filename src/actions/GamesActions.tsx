import {
  FETCH_GAMES,
  FETCH_GAMES_NOMORE,
  FETCH_GAMES_SUCCESS,
  RESET_GAMES_DATA,
} from "../constants/ActionTypes";
import { GameType } from "../types/GameType";
import { GameResponse, InvalidResponse } from "../types/ResponseType";
import { AppThunk } from "../types/ThunkType";
import { fetchApi } from "../utils/api";

export const startFetchGames = (queryType: string, queryString: string) => ({
  type: FETCH_GAMES,
  payload: { queryType, queryString },
});

const storeGames = (
  queryType: string,
  queryString: string,
  nextPage: number,
  gamesLoaded: GameType[]
) => {
  return {
    type: FETCH_GAMES_SUCCESS,
    payload: {
      queryType,
      queryString,
      nextPage,
      gamesLoaded,
    },
  };
};

const fetchGamesNoMore = (queryType: string, queryString: string) => ({
  type: FETCH_GAMES_NOMORE,
  payload: { queryType, queryString },
});

export const clearGames = (queryType: string, queryString: string) => ({
  type: RESET_GAMES_DATA,
  payload: { queryType, queryString },
});

const fetchGames = (
  queryType: string,
  queryString: string,
  page: number = 1
): AppThunk => {
  return async (dispatch) => {
    dispatch(startFetchGames(queryType, queryString));
    try {
      let params: object = {};
      if (!(queryType === "all")) {
        params = { [queryType]: queryString, page };
      }
      const gamesData = (await fetchApi("/games", params)).data;
      if (!(gamesData as InvalidResponse).detail) {
        const nextPage = page + 1;
        dispatch(
          storeGames(
            queryType,
            queryString,
            nextPage,
            (gamesData as GameResponse).results
          )
        );
      }
    } catch (e: unknown) {
      dispatch(fetchGamesNoMore(queryType, queryString));
    }
  };
};

export const getUnfetchedGames = (
  queryType: string,
  queryString: string
): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.games[queryType]?.[queryString]) {
      dispatch(fetchGames(queryType, queryString));
    }
  };
};

export const getNextGames = (
  queryType: string,
  queryString: string
): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    const page = state.games[queryType][queryString].nextPage;
    if (
      !state.games[queryType][queryString].loading &&
      state.games[queryType][queryString].hasNext
    ) {
      dispatch(fetchGames(queryType, queryString, page));
    }
  };
};
