import { Action, ActionCreator } from "redux";
import { FETCH_GENRES, FETCH_GENRES_SUCCESS } from "../constants/ActionTypes";
import { GenreType } from "../reducers/GenreReducer";
import { AppThunk } from "../types/ThunkType";
import { fetchApi } from "../utils/api";

const startFetchGenres = () => ({
  type: FETCH_GENRES,
});
const storeGenres = (genreData: GenreType[]) => ({
  type: FETCH_GENRES_SUCCESS,
  payload: genreData,
});

const fetchAllGenres = (): AppThunk => {
  return async (dispatch) => {
    dispatch(startFetchGenres());
    const genreData = (await fetchApi("/genres")).data;
    dispatch(storeGenres(genreData.results));
  };
};
