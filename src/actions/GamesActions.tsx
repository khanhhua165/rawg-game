import { FETCH_GAMES, FETCH_GAMES_SUCCESS } from "../constants/ActionTypes";
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
  nextPage: number | null,
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

const fetchGames = (
  queryType: string,
  queryString: string,
  page: number = 1
): AppThunk => {
  return async (dispatch) => {
    dispatch(startFetchGames(queryType, queryString));

    const params = { [queryType]: queryString, page };
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
