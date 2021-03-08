import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getGames, getLoading } from "../selectors/GamesByGenreSelectors";
import { RootState } from "../store";

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps) => ({
  loading: getLoading(state),
  games: getGames(state, ownProps),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const GamesDisplayed: React.FC<PropsFromRedux & RouteComponentProps> = (
  props
) => {
  const result = props.games.map((game) => (
    <div key={game.id} className="text-4xl">
      {game.name}
    </div>
  ));
  return <>{result}</>;
};

export default connector(withRouter(GamesDisplayed));
