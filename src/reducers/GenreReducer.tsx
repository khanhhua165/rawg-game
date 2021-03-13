import { GenreData } from "../actions/GenreActions";
import * as actionTypes from "../constants/ActionTypes";

interface GenreGames {
  id: number;
  slug: string;
  name: string;
  added: number;
}
export interface GenreType {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  games: GenreGames[];
  following: boolean | null;
}

interface GenreDesc {
  [genre: string]: string;
}
export interface GenreState {
  loading: boolean;
  genres: GenreData[];
  description: GenreDesc;
}

const initialState = {
  loading: true,
  genres: [],
  description: {},
};

interface GenreDescPayload {
  genre: string;
  desc: string;
}

const genreReducer = (
  state: GenreState = initialState,
  action: { type: string; payload: GenreData[] | undefined | GenreDescPayload }
): GenreState => {
  switch (action.type) {
    case actionTypes.FETCH_GENRES:
      return { ...state, loading: true };
    case actionTypes.FETCH_GENRES_SUCCESS:
      if (action.payload) {
        return {
          ...state,
          loading: false,
          genres: action.payload as GenreData[],
        };
      }
      return { ...state };
    case actionTypes.FETCH_GENRE_DESCRIPTION:
      return {
        ...state,
        description: {
          ...state.description,
          [(action.payload as GenreDescPayload)
            .genre]: (action.payload as GenreDescPayload).desc,
        },
      };
    default:
      return state;
  }
};
export default genreReducer;
