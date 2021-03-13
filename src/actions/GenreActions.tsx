import {
  FETCH_GENRES,
  FETCH_GENRES_SUCCESS,
  FETCH_GENRE_DESCRIPTION,
} from "../constants/ActionTypes";
import GenreDescResponse, {
  GenreResponse,
  InvalidResponse,
} from "../types/ResponseType";
import { AppThunk } from "../types/ThunkType";
import { fetchApi } from "../utils/api";

export interface GenreData {
  id: number;
  name: string;
  slug: string;
  image: string;
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
            return {
              id: genre.id,
              name: genre.name,
              slug: genre.slug,
              image: genre.image_background,
            };
          })
        )
      );
    }
  };
};

const storeDescription = (genre: string, desc: string) => ({
  type: FETCH_GENRE_DESCRIPTION,
  payload: { genre, desc },
});

const fetchDescription = (genre: string): AppThunk => {
  return async (dispatch) => {
    const descData = (await fetchApi(`/genres/${genre}`))
      .data as GenreDescResponse;
    dispatch(storeDescription(descData.slug, descData.description));
  };
};

export const fetchDescIfNeeded = (genre: string): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.genre.description[genre]) {
      dispatch(fetchDescription(genre));
    }
  };
};
