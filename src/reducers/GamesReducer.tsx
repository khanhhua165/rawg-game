import * as actionTypes from "../constants/ActionTypes";
import { GameType } from "../types/GameType";

interface GamesLoaded {
  loading: boolean;
  hasNext: boolean;
  nextPage: number;
  games: GameType[];
}
interface GamesContainer {
  [queryString: string]: GamesLoaded;
}
interface GamesPayload {
  queryType: string;
  queryString: string;
  nextPage: number;
  gamesLoaded: GameType[];
}

interface RequestPayload {
  queryType: string;
  queryString: string;
}
type GamePayload = GamesPayload | RequestPayload;

interface GamesState {
  [queryType: string]: GamesContainer;
}

const initialState = {};

const gamesReducer = (
  state: GamesState = initialState,
  action: { type: string; payload: GamePayload }
): GamesState => {
  switch (action.type) {
    case actionTypes.FETCH_GAMES: {
      const { queryType, queryString } = action.payload as RequestPayload;
      return {
        ...state,
        [queryType]: {
          ...state[queryType],
          [queryString]: {
            ...state[queryType]?.[queryString],
            loading: true,
            hasNext: true,
          },
        },
      };
    }
    case actionTypes.FETCH_GAMES_NOMORE: {
      const { queryType, queryString } = action.payload as RequestPayload;
      return {
        ...state,
        [queryType]: {
          ...state[queryType],
          [queryString]: {
            ...state[queryType]?.[queryString],
            loading: false,
            hasNext: false,
          },
        },
      };
    }
    case actionTypes.RESET_GAMES_DATA: {
      const { queryType, queryString } = action.payload as RequestPayload;
      const currentGames = state[queryType][queryString].games;
      const totalGamesCount = currentGames.length;
      let baseGame = 20;
      if (totalGamesCount < 20) baseGame = totalGamesCount;
      const baseGamesStore = currentGames.slice(0, baseGame);
      return {
        ...state,
        [queryType]: {
          ...state[queryType],
          [queryString]: {
            ...state[queryType]?.[queryString],
            hasNext: true,
            nextPage: 2,
            games: baseGamesStore,
          },
        },
      };
    }
    case actionTypes.FETCH_GAMES_SUCCESS: {
      let updatedGames: GameType[] = [];
      const {
        queryString,
        queryType,
        nextPage,
        gamesLoaded,
      } = action.payload as GamesPayload;
      if (!state[queryType]?.[queryString]?.games) {
        updatedGames = [...gamesLoaded];
      } else {
        updatedGames = [...state[queryType][queryString].games, ...gamesLoaded];
      }

      return {
        ...state,
        [queryType]: {
          ...state[queryType],
          [queryString]: {
            ...state[queryType]?.[queryString],
            loading: false,
            nextPage: nextPage,
            games: updatedGames,
          },
        },
      };
    }
    default:
      return state;
  }
};
export default gamesReducer;
