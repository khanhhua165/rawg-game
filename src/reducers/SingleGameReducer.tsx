import * as actionTypes from "../constants/ActionTypes";
import { Screenshot, SingleGameResponse } from "../types/GameType";
import { Trailer } from "../types/ResponseType";

interface SingleGamePayload {
  slug: string;
  game:
    | (SingleGameResponse & { screenshots: Screenshot[] } & {
        trailers: Trailer[];
      })
    | { error: boolean };
}

interface GameState {
  [slug: string]:
    | (SingleGameResponse & { screenshots: Screenshot[] } & {
        trailers: Trailer[];
      })
    | { error: boolean };
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
