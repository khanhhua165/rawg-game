import * as actionTypes from "../constants/ActionTypes";
import { GameType } from "../types/GameType";
interface GamesWithGenre {
  genre: string;
  nextPage: number | null;
  games: GameType[];
}

export interface GameGenreState {
  loading: boolean;
  currentGenre: string;
  games: GamesWithGenre[];
}

interface GamePayload {
  nextPage: number | null;
  gamesLoaded: GameType[];
}

const initialState: GameGenreState = {
  loading: true,
  currentGenre: "",
  games: [],
};

const gamesByGenreReducer = (
  state = initialState,
  action: { type: string; payload?: GamePayload }
) => {};

const gamesReducer = (
  state = initialState,
  action: { type: string; payload?: GamePayload }
) => {
  switch (action.type) {
    case actionTypes.FETCH_GAMES:
      return { ...state, loading: true };
    case actionTypes.CHANGE_GAME_GENRE:
      return { ...state, genre: action.payload!.genre };
    case actionTypes.FETCH_GAMES_SUCCESS:
      const nextPage = action.payload!.nextPage;
      const currentGameStored = [...state.games];

      return { ...state, loading: false, nextPage, games: currentGameStored };
    default:
      return state;
  }
};
export default gamesReducer;
