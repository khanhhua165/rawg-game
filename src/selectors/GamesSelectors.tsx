import { createSelector } from "reselect";
import { RootState } from "../store";
import { getKey, getType } from "./TypeSelectors";

export const getLoading = (state: RootState) => state.games.loading;
const getGenreGames = (state: RootState) => state.games.gamesByGenre;
const getSearchGames = (state: RootState) => state.games.gamesBySearch;

export const getGames = createSelector(
  [getGenreGames, getSearchGames, getType, getKey],
  (genreGames, searchGames, type, key) => {
    if (type === "genre") {
      if (!genreGames[key]) return [];
      return genreGames[key].games;
    }
    if (type === "search") {
      return searchGames[key].games;
    }
  }
);
