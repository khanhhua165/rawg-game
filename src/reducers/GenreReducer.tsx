import * as actionTypes from "../constants/ActionTypes";

interface GenreType {
  id: number;
  name: string;
  slug: string;
}

export interface GenreState {
  loading: boolean;
  genres: GenreType[];
}

const initialState: GenreState = {
  loading: true,
  genres: [],
};

const genreReducer = (
  state = initialState,
  action: { type: string; payload?: GenreType[] }
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
