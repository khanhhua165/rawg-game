import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { getGenre, getLoading } from "../selectors/GenreSelectors";
import { RootState } from "../store";
import Games from "./Games";

const mapStateToProps = (state: RootState) => ({
  loading: getLoading(state),
  genres: getGenre(state),
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const GamesByGenre: React.FC<PropsFromRedux> = ({ loading, genres }) => {
  if (!loading) {
    return null;
  }
  const genreRoutes = genres.map((genre) => (
    <Route
      key={genre.id}
      path={`/games?genre=${genre.slug}`}
      exact
      component={Games}
    />
  ));
  return (
    <Route>
      <Switch>
        <Redirect from="/" to="/games?genre=action" exact />
        <Redirect from="/games" to="/games?genre=action" exact />
        {genreRoutes}
      </Switch>
    </Route>
  );
};

export default connector(GamesByGenre);
