import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import useQuery from "../hooks/QueryHook";
import { getUnfetchedGames } from "../actions/GamesActions";
import { getGames, getLoading } from "../selectors/GamesSelectors";
import { RootState } from "../store";
import GamesDisplayed from "./GamesDisplayed";
import { getType } from "../selectors/TypeSelectors";

const mapStateToProps = (state: RootState) => ({
  loading: getLoading(state),
  type: getType(state),
  games: getGames(state),
});

const mapDispatchToProps = { getUnfetchedGames };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Games: React.FC<RouteComponentProps & PropsFromRedux> = ({
  getUnfetchedGames
  loading,
  type,
  games,
}) => {
  const query = useQuery();
  useEffect(() => {
    console.log("haha");
    if (type === "genre") {
      getUnfetchedGamesGenre(query.get("genre")!);
    }
    if (type === "search") {
      getUnfetchedGamesSearch(query.get("search")!);
    }
  }, [getUnfetchedGamesGenre, getUnfetchedGamesSearch, type, query]);
  if (loading) {
    return <div className="text-pink-400 text-7xl">LOADING</div>;
  }

  return (
    <div className="flex flex-col">
      <GamesDisplayed games={games!} />
    </div>
  );
};

export default connector(Games);
