import * as actionTypes from "../constants/ActionTypes";
import { GameType } from "../types/GameType";
interface GamesWithGenre {
  genre: string;
  games: GameType[];
}
export interface GameState {
  loading: boolean;
  nextPage: number | null;
  games: GamesWithGenre[];
}

interface GamePayload {
  nextPage: number | null;
  gamesLoaded: GamesWithGenre;
}

const initialState: GameState = {
  loading: true,
  nextPage: 2,
  games: [],
};

const gameReducer = (
  state = initialState,
  action: { type: string; payload?: GamePayload }
) => {
  switch (action.type) {
    case actionTypes.FETCH_GAMES:
      return { ...state, loading: true };
    case actionTypes.FETCH_GAMES_SUCCESS:
      if (action.payload) {
        const nextPage = action.payload.nextPage;
        const currentGameStored = [...state.games];
        currentGameStored.push(action.payload.gamesLoaded);
        return { ...state, loading: false, nextPage, games: currentGameStored };
      }
      return state;
    default:
      return state;
  }
};
export default gameReducer;
