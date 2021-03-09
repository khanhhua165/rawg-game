import * as actionTypes from "../constants/ActionTypes";
import { GameType } from "../types/GameType";

interface GamesLoaded {
  nextPage: number | null;
  games: GameType[];
}
interface GamesContainer {
  [name: string]: GamesLoaded;
}
interface GameGenrePayload {
  genre: string;
  nextPage: number | null;
  gamesLoaded: GameType[];
}

interface GameSearchPayload {
  searchString: string;
  nextPage: number | null;
  gamesLoaded: GameType[];
}

type GamePayload = GameGenrePayload | GameSearchPayload | undefined;

interface GamesState {
  loading: boolean;
  gamesByGenre: GamesContainer;
  gamesBySearch: GamesContainer;
}

const initialState = { loading: false, gamesByGenre: {}, gamesBySearch: {} };

const gamesReducer = (
  state: GamesState = initialState,
  action: { type: string; payload: GamePayload }
): GamesState => {
  switch (action.type) {
    case actionTypes.FETCH_GAMES:
      return { ...state, loading: true };
    case actionTypes.FETCH_GAMES_GENRE_SUCCESS:
      const updatedGames = [
        ...state.gamesByGenre[(action.payload as GameGenrePayload).genre].games,
        ...(action.payload as GameGenrePayload).gamesLoaded,
      ];
      return {
        loading: false,
        gamesByGenre: {
          ...state.gamesByGenre,
          [(action.payload as GameGenrePayload).genre]: {
            nextPage: (action.payload as GameGenrePayload).nextPage,
            games: updatedGames,
          },
        },
        gamesBySearch: { ...state.gamesBySearch },
      };
    case actionTypes.FETCH_GAMES_SEARCH_SUCCESS:
      const newGames = [
        ...state.gamesByGenre[
          (action.payload as GameSearchPayload).searchString
        ].games,
        ...(action.payload as GameSearchPayload).gamesLoaded,
      ];
      return {
        loading: false,
        gamesBySearch: {
          ...state.gamesBySearch,
          [(action.payload as GameSearchPayload).searchString]: {
            nextPage: (action.payload as GameSearchPayload).nextPage,
            games: newGames,
          },
        },
        gamesByGenre: { ...state.gamesByGenre },
      };
    default:
      return state;
  }
};
export default gamesReducer;
