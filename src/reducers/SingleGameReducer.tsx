import * as actionTypes from "../constants/ActionTypes";
import { Screenshot, SingleGameResponse } from "../types/GameType";

interface SingleGamePayload {
  slug: string;
  game: SingleGameResponse & { screenshots: Screenshot[] };
}

interface GameState {
  [slug: string]: SingleGameResponse & { screenshots: Screenshot[] };
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
