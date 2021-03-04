import * as actionTypes from "../constants/ActionTypes";
import { GameType } from "../types/GameType";

export interface GameState {
  loading: boolean;
  nextpage: number | null;
  games: GameType[];
}

const initialState: GameState = {
  loading: false,
  nextpage: 2,
  games: [],
};

const gameReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case actionTypes.FETCH_GAMES:
      return { ...state, loading: true };
    case actionTypes.FETCH_GAMES_SUCCESS:
      return state;
    default:
      return state;
  }
};
export default gameReducer;
