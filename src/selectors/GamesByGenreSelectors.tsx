import { RouteComponentProps } from "react-router";
import { createSelector } from "reselect";
import { RootState } from "../store";

export const getLoading = (state: RootState) => state.gamesByGenre.loading;
const getAllGames = (state: RootState, ownProps: RouteComponentProps) =>
  state.gamesByGenre.games;
const getGenre = (state: RootState, ownProps: RouteComponentProps) =>
  ownProps.location.search.substring(7);

export const getGames = createSelector(
  [getAllGames, getGenre],
  (allGames, genre) => allGames[genre].games
);
