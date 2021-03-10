import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getUnfetchedGames } from "../actions/GamesActions";
import { getGames } from "../selectors/GamesSelectors";
import { RootState } from "../store";
import GamesDisplayed from "./GamesDisplayed";
import { GameType } from "../types/GameType";

const mapStateToProps = (state: RootState) => ({
  games: getGames(state),
});

const mapDispatchToProps = { getUnfetchedGames };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Games: React.FC<
  PropsFromRedux & { queryType: string; queryString: string }
> = ({ getUnfetchedGames, games, queryType, queryString }) => {
  useEffect(() => {
    getUnfetchedGames(queryType, queryString);
  }, [getUnfetchedGames, queryString, queryType]);

  let gamesDisplayed: GameType[] = [];

  if (games[queryType]?.[queryString]?.games) {
    gamesDisplayed = [...games[queryType][queryString].games];
  }
  return (
    <div className="flex flex-col">
      <GamesDisplayed games={gamesDisplayed} />
    </div>
  );
};

export default connector(Games);
