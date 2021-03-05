import { Action, ActionCreator } from "redux";
import { FETCH_GENRES } from "../constants/ActionTypes";
import { AppThunk } from "../types/ThunkType";
import { fetchApi } from "../utils/api";

const startFetchGenres: ActionCreator<Action<string>> = () => ({
  type: FETCH_GENRES,
});

const fetchallGenres = (): AppThunk => {
  return async (dispatch) => {
    dispatch(startFetchGenres());
    const genreData = await fetchApi("/genres");
  };
};
