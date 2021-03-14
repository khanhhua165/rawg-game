import * as actionTypes from "../constants/ActionTypes";
import { SingleGameResponse } from "../types/GameType";

interface SingleGamePayload {
  slug: string;
  game: SingleGameResponse;
}

interface GameState {
  [slug: string]: SingleGameResponse;
}

const initialState = {};

const gameReducer = (
  state: GameState = initialState,
  action: {
    type: string;
    payload: SingleGamePayload;
  }
): GameState => {
  switch (action.type) {
    case actionTypes.FETCH_GAME:
      const { slug, game } = action.payload;
      return { ...state, [slug]: game };
    default:
      return state;
  }
};

export default gameReducer;
