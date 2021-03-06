import { RootState } from "../store";

export const getGenre = (state: RootState) => state.genre.genres;
export const getLoading = (state: RootState) => state.genre.loading;
