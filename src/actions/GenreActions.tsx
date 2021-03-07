import { FETCH_GENRES, FETCH_GENRES_SUCCESS } from "../constants/ActionTypes";
import { GenreResponse, InvalidResponse } from "../types/ResponseType";
import { AppThunk } from "../types/ThunkType";
import { fetchApi } from "../utils/api";

export interface GenreData {
  id: number;
  name: string;
  slug: string;
}

const startFetchGenres = () => ({
  type: FETCH_GENRES,
});
const storeGenres = (genreData: GenreData[]) => ({
  type: FETCH_GENRES_SUCCESS,
  payload: genreData,
});

export const fetchAllGenres = (): AppThunk => {
  return async (dispatch) => {
    dispatch(startFetchGenres());
    const genreData = (await fetchApi("/genres")).data;
    if (!(genreData as InvalidResponse).detail) {
      dispatch(
        storeGenres(
          (genreData as GenreResponse).results.map((genre) => {
            return { id: genre.id, name: genre.name, slug: genre.slug };
          })
        )
      );
    }
  };
};
