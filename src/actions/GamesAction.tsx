import { FETCH_GAMES, FETCH_GENRES_SUCCESS } from "../constants/ActionTypes";
import { GameType } from "../types/GameType";
import { AppThunk } from "../types/ThunkType";

const startFetchGames = () => ({
  type: FETCH_GAMES,
});

const finishGames = (
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

export const fetchGames = (genre: string): AppThunk => {
  return (dispatch, getState) => {};
};
