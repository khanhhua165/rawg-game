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

export interface GenreState {
  loading: boolean;
  genres: GenreData[];
}

const initialState: GenreState = {
  loading: true,
  genres: [],
};

const genreReducer = (
  state = initialState,
  action: { type: string; payload: GenreData[] | undefined }
) => {
  switch (action.type) {
    case actionTypes.FETCH_GENRES:
      return { ...state, loading: true };
    case actionTypes.FETCH_GENRES_SUCCESS:
      if (action.payload) {
        return { ...state, loading: false, genres: action.payload };
      }
      return { ...state };
    default:
      return state;
  }
};
export default genreReducer;
