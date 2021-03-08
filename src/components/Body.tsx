import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getGenre, getLoading } from "../selectors/GenreSelectors";
import { RootState } from "../store";
import { fetchAllGenres } from "../actions/GenreActions";
import Spinner from "../svgs/Spinner";
import GenreNav from "./GenreNav";
import { Redirect, Route, Switch } from "react-router-dom";
import Games from "./Games";

const mapStateToProps = (state: RootState) => ({
  loading: getLoading(state),
  genres: getGenre(state),
});

const mapDispatchToProps = { fetchAllGenres };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Body: React.FC<PropsFromRedux> = ({
  loading,
  genres,
  fetchAllGenres,
}) => {
  useEffect(() => {
    fetchAllGenres();
  }, [fetchAllGenres]);
  if (loading) {
    return (
      <div className="flex flex-col items-center w-full mt-28">
        <Spinner classItems="w-24 mx-auto animate-spin dark:text-gray-300" />
        <div className="text-xl italic font-semibold dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-11/12 mx-auto">
      <GenreNav genres={genres} />
      <Switch>
        <Route exact path="/">
          <Redirect to="/games?genre=action" />
        </Route>
        <Route path="/games" component={Games} />
      </Switch>
    </div>
  );
};

export default connector(Body);
